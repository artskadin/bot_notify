const {Telegraf} = require('telegraf')
const tokens = require('../../tokens.js')

const bot = new Telegraf(
  process.env.AlphaPayBenefitFXBotToken ?? tokens.AlphaPayBenefitFXBotToken
)

bot.on('text', ctx => {
  ctx.reply('AlphaPayBenefitFXBotToken is working')
})

bot.launch()