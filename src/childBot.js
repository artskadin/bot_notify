const {Telegraf} = require('telegraf')

const sendDataToChildBot = function(botName, token) {
  const bot = new Telegraf(token)
    
  bot.telegram.sendMessage(165652330, `Hello from ${botName}`)

  bot.launch()
}

module.exports = sendDataToChildBot