// ChatGPTにメッセージを送信して応答を取得する関数
// OpenAIのAPIキーを環境変数から取得

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
        
        console.log('ChatGPTの応答:', response.data.choices[0].text.trim());
                document.getElementById('response').innerText = 'ChatGPTの応答: ' + response.data.choices[0].text.trim();
            } catch (error) {
                // エラーが発生した場合
                console.error('エラー:', error);
                document.getElementById('response').innerText = 'エラーが発生しました。もう一度試してください。';
            }
}



// エクスポートして他のファイルから利用できるようにする
module.exports = { getChatGPTResponse };
