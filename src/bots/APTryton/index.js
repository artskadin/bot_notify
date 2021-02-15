import Telegraf from 'telegraf'
import tokens from '../../tokens.js'
import express from 'express'

const app = express()
const PORT = 3004

const bot = new Telegraf(
  process.env.AlphaPayTrytonBotToken ?? tokens.AlphaPayTrytonBotToken
)

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayTrytonBotToken is running on port ${PORT}`))