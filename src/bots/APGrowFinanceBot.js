const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayGrowFinanceBotToken)
    
bot.launch()