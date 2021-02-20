const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayGrowFinanceBotToken ?? '1613531202:AAEPkvK730eQq7_WfL9xZQN-ReKyOx7mmf4')
    
bot.launch()