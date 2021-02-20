const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayTrytonBotToken ?? '1695042070:AAG0rD7M5vPtTNnBoVKqrqgw5QxWnke0EmA')
    
bot.launch()