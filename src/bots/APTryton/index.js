import Telegraf from 'telegraf'
import tokens from '../../tokens.js'

const bot = new Telegraf(
  process.env.AlphaPayTrytonBotToken ?? tokens.AlphaPayTrytonBotToken
)


bot.launch()