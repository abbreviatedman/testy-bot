const Slackbot = require('slackbots')

const {SLACK_BOT_API_TOKEN} = require('./api_keys')

const CHANNEL = 'general'

const testy = new Slackbot({
    token: SLACK_BOT_API_TOKEN,
    name: "Testy"
})

    let ID = ''

const handleMessage = (message) => {
    testy.postMessageToChannel(CHANNEL, message.toUpperCase())
}

testy.on('start', () => {
    testy.postMessageToChannel(CHANNEL, "I'm testy!")
    testy.getUserId('testy')
    .then(userId => console.log(userId))
})

testy.on('message', ({type, text, channel}) => {
    if (type !== 'message') {
        return
    }

    testy.getUserId('testy')
        .then(botId => {
            if (text.includes(botId)) {
                const fullBotId = `<@${botId}>`
                const start = text.indexOf(fullBotId)
                const end = start + fullBotId.length
                const messageWithoutBotName = text.slice(0, start) + text.slice(end)
                const returnMessage = messageWithoutBotName.toUpperCase().trim();
                testy.postMessage(channel, returnMessage)
            }
        })
})