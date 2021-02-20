const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayNyseBrokBotToken ?? '1640352270:AAFf8T8keWtvZIWesVDgxwURuoV1rvCEm9U')
    
bot.launch()