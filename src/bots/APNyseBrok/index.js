const {Telegraf} = require('telegraf')
const tokens = require('../../tokens.js')

const bot = new Telegraf(
  process.env.AlphaPayNyseBrokBotToken ?? tokens.AlphaPayNyseBrokBotToken
)

bot.on('text', ctx => {
  ctx.reply('AlphaPayNyseBrokBot is working')
})

bot.launch()