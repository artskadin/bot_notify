import Telegraf from 'telegraf'
import tokens from '../../tokens.js'
import express from 'express'

const app = express()
const PORT = 3002

const bot = new Telegraf(
  process.env.AlphaPayGrowFinanceBotToken ?? tokens.AlphaPayGrowFinanceBotToken
)

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayGrowFinanceBotToken is running in port ${PORT}`))