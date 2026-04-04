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

export async function onRequestPost({ request, env }) {
    try {
        const data = await request.json();
        const { name, email, company, subject, message, phone } = data;

        // 1. Save to Firebase Firestore (Server-side)
        let firebaseSuccess = false;
        try {
            // Priority: Environment secrets, then fallback to placeholders
            const projectId = env.FIREBASE_PROJECT_ID || "rumuze";
            const clientEmail = env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@rumuze.iam.gserviceaccount.com";
            // Check if private key is in env or hardcoded (for testing - though not recommended for production)
            const privateKey = env.FIREBASE_PRIVATE_KEY;

            if (privateKey) {
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
                            name:    { stringValue: name    || "" },
                            email:   { stringValue: email   || "" },
                            orgName: { stringValue: company || "" },
                            phone:   { stringValue: phone   || "" },
                            message: { stringValue: message || "" },
                            subject: { stringValue: subject || "" },
                            createdAt: { timestampValue: new Date().toISOString() }
                        }
                    })
                });

                if (firestoreResponse.ok) {
                    firebaseSuccess = true;
                }
            }
        } catch (firebaseErr) {
            console.error("Firebase Error:", firebaseErr.message);
        }

        // 2. Send Telegram Notification
        const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN || "7766861460:AAH8t24-6J0qGzHO0PTMPhC6yDq6G1j1p2w";
        const CHAT_ID = env.TELEGRAM_CHAT_ID || "5000965306";

        const text = `
🚀 *New Lead from Rumuze Website*

👤 *Name:* ${name}
🏢 *Company:* ${company || "N/A"}
📧 *Email:* ${email}

📝 *Subject:* ${subject || "N/A"}
💬 *Message:*
${message}

----------------------------------
_Stored in Firebase: ${firebaseSuccess ? "✅" : "❌"}_
    `;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        return new Response(JSON.stringify({ success: true, firebase: firebaseSuccess }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            status: 200
        });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            status: 500
        });
    }
}

