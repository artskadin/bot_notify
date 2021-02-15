const express = require('express')
const bodyParser = require('body-parser')
const {Telegraf} = require('telegraf')
const tokens = require('./tokens.js')
const botsList = require('./botsList.js')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('server is working')
})

app.post('/', (req, res) => {
  try {
    res.send('<h1>Data were sent</h1>')
    const data = JSON.stringify(req.body)
    console.log(data)
  } catch (e) {
    res.send('<h1>Bad request</h1>')
  }
})

const bot = new Telegraf(
  process.env.AlphaPayPoolBotToken ?? tokens.AlphaPayPoolBotToken
)

bot.on('text', async ctx => {
  try {
    await ctx.reply('work')
    for (let bot in botsList) {
      if (botsList[bot].merchantId === ctx.message.text) {
        await ctx.telegram.sendMessage(botsList[bot].telegramId, 'from main bot')
      }
    }
  } catch (e) {
    await ctx.reply(e)
  }
})

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayPoolBotToken is runnig on port ${PORT}`))