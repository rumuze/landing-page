export async function onRequestPost({ request }) {
    try {
        const data = await request.json();
        const { name, email, company, subject, message } = data;

        // Telegram Configuration
        // In production, these should be environment variables
        const BOT_TOKEN = "7766861460:AAH8t24-6J0qGzHO0PTMPhC6yDq6G1j1p2w"; // RumuzeBot (Example token, user would replace)
        const CHAT_ID = "5000965306"; // Target Chat ID

        const text = `
🚀 *New Lead from Rumuze Website*

👤 *Name:* ${name}
🏢 *Company:* ${company || "N/A"}
📧 *Email:* ${email}

📝 *Subject:* ${subject || "N/A"}
💬 *Message:*
${message}

----------------------------------
_Sent via Cloudflare Workers_
    `;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();

        if (!result.ok) {
            throw new Error(`Telegram API Error: ${result.description}`);
        }

        return new Response(JSON.stringify({ success: true, message: "Signal received" }), {
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
