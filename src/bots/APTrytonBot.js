const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayTrytonBotToken)
    
bot.launch()