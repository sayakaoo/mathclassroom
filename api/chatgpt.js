const axios = require('axios');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userInput } = req.body;
    if (!userInput) {
        return res.status(400).json({ error: 'User input is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'APIキーが設定されていません' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-3.5-turbo',
                prompt: userInput,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.status(200).json({ text: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('APIリクエストエラー:', error);
        return res.status(500).json({ error: 'ChatGPT APIへのリクエスト中にエラーが発生しました' });
    }
}
