const {Telegraf} = require('telegraf')
const tokens = require('../../tokens.js')

const bot = new Telegraf(
  process.env.AlphaPayTrytonBotToken ?? tokens.AlphaPayTrytonBotToken
)

bot.on('text', ctx => {
  ctx.reply('AlphaPayTrytonBot is working')
})

bot.launch()