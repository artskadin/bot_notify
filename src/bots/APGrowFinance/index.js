const {Telegraf} = require('telegraf')
const tokens = require('../../tokens.js')

const bot = new Telegraf(
  process.env.AlphaPayGrowFinanceBotToken ?? tokens.AlphaPayGrowFinanceBotToken
)

bot.on('text', ctx => {
  ctx.reply('AlphaPayGrowFinanceBotToken is working')
})

bot.launch()