// ChatGPTにメッセージを送信して応答を取得する関数
require('dotenv').config();  // dotenvを読み込む

const axios = require('axios');

// OpenAIのAPIキーを環境変数から取得
require('dotenv').config();  // dotenvを読み込む

const axios = require('axios');

// OpenAIのAPIキーを環境変数から取得
const apiKey = process.env.OPENAI_API_KEY;

async function getChatGPTResponse(userInput) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: userInput,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching response from ChatGPT:', error);
        return 'エラーが発生しました。もう一度試してください。';
    }
}

module.exports = { getChatGPTResponse };


// エクスポートして他のファイルから利用できるようにする
module.exports = { getChatGPTResponse };
