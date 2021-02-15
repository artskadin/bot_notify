import express from 'express'
import Telegraf from 'telegraf'
import tokens from '../../tokens.js'

const app = express()
const PORT = 3001

const bot = new Telegraf(
  process.env.AlphaPayBenefitFXBotToken ?? tokens.AlphaPayBenefitFXBotToken
)

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayBenefitFXBotToken is running on port ${PORT}`))