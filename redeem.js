export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false });
    }

    const { playerId, code } = req.body;

    if (!playerId || !code) {
        return res.json({ success: false });
    }

    // Example codes (REPLACE with DB later)
    const codes = {
        "Penis": { itemId: "LBAAD.", used: false },
        "Test": { itemId: "CoolHat", used: true }
    };

    if (!codes[code] || codes[code].used) {
        return res.json({ success: false });
    }

    try {
        codes[code].used = true;

        const response = await fetch(
            "https://1B93F7.playfabapi.com/Admin/GrantItemsToUser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-SecretKey": "8D8JT7RT6UEUUUJAARF7SR9ABEBAYJ6CKC7BI3W7WS3R6PFMJU"
                },
                body: JSON.stringify({
                    PlayFabId: playerId,
                    ItemIds: [codes[code].itemId]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            return res.json({ success: false });
        }

        return res.json({ success: true });

    } catch (err) {
        return res.json({ success: false });
    }
}
