const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayBenefitFXBotToken)
    
bot.launch()