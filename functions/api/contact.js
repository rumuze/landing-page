// Helper for base64 encoding that works in Cloudflare Workers
function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(email, privateKey) {
    const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const payload = base64UrlEncode(JSON.stringify({
        iss: email,
        sub: email,
        aud: 'https://oauth2.googleapis.com/token',
        iat,
        exp,
        scope: 'https://www.googleapis.com/auth/datastore'
    }));

    const unsignedJwt = `${header}.${payload}`;

    // Clean the private key
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = privateKey
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\s/g, "");

    const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
        'pkcs8',
        binaryKey.buffer,
        {
            name: 'RSASSA-PKCS1-v1_5',
            hash: 'SHA-256',
        },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        new TextEncoder().encode(unsignedJwt)
    );

    const signedJwt = `${unsignedJwt}.${base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)))}`;

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJwt}`
    });

    const data = await response.json();
    return data.access_token;
}

const ALLOWED_ORIGINS = new Set([
    'https://rumuze.com',
    'https://www.rumuze.com',
]);

const LIMITS = { name: 120, email: 320, company: 200, subject: 200, phone: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status, origin) {
    const headers = { 'Content-Type': 'application/json', 'Vary': 'Origin' };
    if (origin) headers['Access-Control-Allow-Origin'] = origin;
    return new Response(JSON.stringify(body), { status, headers });
}

function clean(value, max) {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// Telegram legacy Markdown treats these as formatting characters.
function escapeMarkdown(value) {
    return value.replace(/([_*`[\]])/g, '\\$1');
}

export async function onRequestOptions({ request }) {
    const origin = request.headers.get('Origin');
    if (!ALLOWED_ORIGINS.has(origin)) {
        return new Response(null, { status: 403 });
    }
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Vary': 'Origin',
        },
    });
}

export async function onRequestPost({ request, env }) {
    const origin = request.headers.get('Origin');
    if (!ALLOWED_ORIGINS.has(origin)) {
        return json({ success: false, error: 'Origin not allowed.' }, 403, null);
    }

    let data;
    try {
        data = await request.json();
    } catch {
        return json({ success: false, error: 'Invalid JSON body.' }, 400, origin);
    }

    const name = clean(data?.name, LIMITS.name);
    const email = clean(data?.email, LIMITS.email);
    const company = clean(data?.company, LIMITS.company);
    const subject = clean(data?.subject, LIMITS.subject);
    const phone = clean(data?.phone, LIMITS.phone);
    const message = clean(data?.message, LIMITS.message);

    if (!name || !message || !EMAIL_RE.test(email)) {
        return json({ success: false, error: 'name, a valid email and message are required.' }, 400, origin);
    }

    try {
        // 1. Save to Firebase Firestore (Server-side)
        let firebaseSuccess = false;
        try {
            const projectId = env.FIREBASE_PROJECT_ID;
            const clientEmail = env.FIREBASE_CLIENT_EMAIL;
            const privateKey = env.FIREBASE_PRIVATE_KEY;

            if (projectId && clientEmail && privateKey) {
                const accessToken = await getAccessToken(clientEmail, privateKey);
                const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/rumuzr`;

                const firestoreResponse = await fetch(firestoreUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fields: {
                            id:      { integerValue: Date.now() },
                            name:    { stringValue: name },
                            email:   { stringValue: email },
                            orgName: { stringValue: company },
                            phone:   { stringValue: phone },
                            message: { stringValue: message },
                            subject: { stringValue: subject },
                            createdAt: { timestampValue: new Date().toISOString() }
                        }
                    })
                });

                firebaseSuccess = firestoreResponse.ok;
            }
        } catch (firebaseErr) {
            console.error("Firebase Error:", firebaseErr.message);
        }

        // 2. Send Telegram Notification
        const botToken = env.TELEGRAM_BOT_TOKEN;
        const chatId = env.TELEGRAM_CHAT_ID;
        let telegramSuccess = false;

        const text = [
            '🚀 *New Lead from Rumuze Website*',
            '',
            `👤 *Name:* ${escapeMarkdown(name)}`,
            `🏢 *Company:* ${escapeMarkdown(company || 'N/A')}`,
            `📧 *Email:* ${escapeMarkdown(email)}`,
            '',
            `📝 *Subject:* ${escapeMarkdown(subject || 'N/A')}`,
            '💬 *Message:*',
            escapeMarkdown(message),
            '',
            '----------------------------------',
            `_Stored in Firebase: ${firebaseSuccess ? '✅' : '❌'}_`,
        ].join('\n');

        if (botToken && chatId) {
            const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
            });

            telegramSuccess = telegramResponse.ok;
        }

        return json({ success: true, firebase: firebaseSuccess, telegram: telegramSuccess }, 200, origin);
    } catch (err) {
        console.error('Contact API error:', err.message);
        return json({ success: false, error: 'Internal error.' }, 500, origin);
    }
}
