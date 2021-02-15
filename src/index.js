import express from 'express'
import bodyParser from 'body-parser'
import {Telegraf} from 'telegraf'
import tokens from './tokens.js'
import botsList from './botsList.js'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('<h1>This shit is working</h1>')
})

const bot = new Telegraf(
  process.env.AlphaPayPoolBotToken ?? tokens.AlphaPayPoolBotToken
)

bot.on('text', ctx => {
  for (let bot in botsList) {
    if (botsList[bot].merchantId === ctx.message.text) {
      ctx.telegram.sendMessage(botsList[bot].telegramId, 'from main bot')
    }
  }
})

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayPoolBotToken is runnig on port ${PORT}`))