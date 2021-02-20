const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.AlphaPayBenefitFXBotToken ?? '1556293544:AAHjidATflnoz-TtXsx4hS11zMGrce90m7A')
    
bot.launch()