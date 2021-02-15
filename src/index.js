const express = require('express')
const bodyParser = require('body-parser')
const {Telegraf} = require('telegraf')
const tokens = require('./tokens.js')
const botsList = require('./botsList.js')

const sendDataToChildBot = require('./childBot.js')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bot = new Telegraf(
  process.env.AlphaPayPoolBotToken ?? tokens.AlphaPayPoolBotToken
)

app.get('/', (req, res) => {
  res.send('server is working')
})

app.post('/', (req, res) => {
  try {
    res.send('<h1>Data were sent</h1>')
    const data = JSON.stringify(req.body)
    console.log(data)

    bot.telegram.sendMessage(165652330, data)
    // sendDataToChildBot('AlphaPayGrowFinanceBot', '1613531202:AAEPkvK730eQq7_WfL9xZQN-ReKyOx7mmf4')

  } catch (e) {
    res.send('<h1>Bad request</h1>')
  }
})

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayPoolBotToken is runnig on port ${PORT}`))