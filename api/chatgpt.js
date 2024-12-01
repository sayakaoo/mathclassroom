import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: 'APIキーが設定されていません' });
        return;
    }

    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: 'Promptが提供されていません' });
        return;
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ text: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('エラー:', error.message);
        res.status(500).json({ error: 'ChatGPT APIの呼び出しに失敗しました' });
    }
}
