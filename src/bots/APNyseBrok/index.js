import Telegraf from 'telegraf'
import tokens from '../../tokens.js'
import express from 'express'

const app = express()
const PORT = 3003

const bot = new Telegraf(
  process.env.AlphaPayNyseBrokBotToken ?? tokens.AlphaPayNyseBrokBotToken
)

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayNyseBrokBotToken is running in port ${PORT}`))