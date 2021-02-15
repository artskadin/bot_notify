import Telegraf from 'telegraf'
import tokens from '../../tokens.js'

const bot = new Telegraf(
  process.env.AlphaPayNyseBrokBotToken ?? tokens.AlphaPayNyseBrokBotToken
)


bot.launch()