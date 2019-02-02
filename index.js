const Slackbot = require('slackbots')

const {SLACK_BOT_API_TOKEN} = require('./api_keys')
const {BOT_NAME} = require('./constants')

const testy = new Slackbot({
    token: SLACK_BOT_API_TOKEN,
    name: BOT_NAME
})

// testy.on('start', () => {
//     testy.postMessageToChannel(CHANNEL, `Hello everyone, I'm ${BOT_NAME}! Don't try to insult me, I'll come back at you with something even harsher!`)
// })
// {type, text, channel}
testy.on('message', handleMessage)

async function handleMessage({
    type,
    channel,
    text,
    username
}) {
    if (type !== 'message') {
        return
    }    

    const botId = await testy.getUserId('testy')
    
    if (text.includes(botId)) {

        const fullBotId = `<@${botId}>`
        const start = text.indexOf(fullBotId)
        const end = start + fullBotId.length
        const messageWithoutBotName = text.slice(0, start) + text.slice(end)
        const returnMessage = messageWithoutBotName.toUpperCase().trim();

        testy.postMessage(channel, returnMessage)
    } else if (channel[0] === 'D' && username !== BOT_NAME) {
        testy.postMessage(channel, text.toUpperCase().trim())
    }
}