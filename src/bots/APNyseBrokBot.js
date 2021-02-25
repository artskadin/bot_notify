const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayNyseBrokBotToken)
    
bot.launch()