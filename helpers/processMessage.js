const API_AI_TOKEN = '2e0ce45b3efe4f2d842d0b4d7ceefe7c';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAACyVSOGFHEBAC7HhKNHgPyQ9WBlWjXhgQzbSn5WzNTQVJd5JMZA1I6HTGiLTl7SZBRryHFM2cpjqprjxf8j5yd35La1uwcuPS2vGJVDdqZBNgsieWNJSgruR3RlPCOYyjjwgPqQ1Q1ifd1tFEx9hAa7ZCiCVKp1zO4ZAax1kPwZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
 });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};