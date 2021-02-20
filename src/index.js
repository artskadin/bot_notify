const express = require('express')
const bodyParser = require('body-parser')
const {Telegraf} = require('telegraf')
const botsList = require('./botsList.js')
const fs = require('fs')
const path = require('path')

const sendDataToChildBot = require('./childBot.js')

const app = express()
const PORT = 3000

const certPath = path.join(__dirname, '../users.json')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bot = new Telegraf(
  process.env.AlphaPayPoolBotToken ?? '1631761373:AAGwVdXFRMzpp4uc5yr3fnYgHcamucjRZx8'
)

let usersFromUsersList = null

bot.hears('updateBot', ctx => {
  usersFromUsersList = JSON.parse(fs.readFileSync(certPath, 'utf8'))
  ctx.reply('Бот был обновлен')
  console.log('updateBot command was success finished')
})

bot.hears('addMeToBot', ctx => {
  const user = {
    username: ctx.message.from.username
  }

  try {
    let users = JSON.parse(fs.readFileSync(certPath, 'utf8'))
    users.usersList[ctx.message.from.id] = user
    console.log(users)
    let data = JSON.stringify(users)
    console.log(typeof data)
    fs.writeFileSync(certPath, data);
    console.log(`user ${ctx.message.from.username} was added`);
  } catch (error) {
    console.error(error);
  }
})

app.get('/', (req, res) => {
  res.send('server is working')
})

app.post('/', (req, res) => {
  console.log(req.query)
  try {
    let merchantId = '5ff582e9d5085f13cee96bc6'
    let merchantName = null

    for (let bot in botsList) {
      if (botsList[bot] === merchantId) {
        merchantName = bot
      }
    }

    const mainBotInfo = {
      paymentMethod: req.body.route.from.xml ?? 'отсутствует',
      amountIn: req.body.order.inAmount ?? 'отсутствует',
      amountOut: req.body.order.outAmount ?? 'отсутствует',
      merchName: merchantName ?? 'отсутствует',
      ipAdress: req.body.order.ip ?? 'отсутсвует',
      email: req.body.order.routeValues[0].value ?? 'отсутствует'
    }

    let generalInfo = '<b>Метод зачисления:</b> ' + mainBotInfo.paymentMethod +
    '\n<b>Сумма in:</b> ' + mainBotInfo.amountIn +
    '\n<b>Сумма out:</b> ' + mainBotInfo.amountOut +
    '\n<b>Название мерчанта исходя из id:</b> ' + mainBotInfo.merchName +
    '\n<b>IP адрес:</b> ' + mainBotInfo.ipAdress +
    '\n<b>E-mail:</b> ' + mainBotInfo.email

    try {
      let usersIdList = Object.keys(usersFromUsersList.usersList)

      const childBotInfo = {
        paymentMethod: req.body.route.from.xml ?? 'отсутствует',
        amountIn: req.body.order.inAmount ?? 'отсутствует',
        ipAdress: req.body.order.ip ?? 'отсутсвует',
        email: req.body.order.routeValues[0].value ?? 'отсутствует'
      }
      
      for (let id in usersIdList) {
        bot.telegram.sendMessage(usersIdList[id], generalInfo, {parse_mode:'HTML'})

        switch(merchantId) {
          case '5fb52d9eff910650ff931d88': 
            sendDataToChildBot(
              'AlphaPayGrowFinanceBot', 
              '1613531202:AAEPkvK730eQq7_WfL9xZQN-ReKyOx7mmf4', 
              usersIdList[id], 
              childBotInfo
            )
            break
          case '5fcf3e7c391f945a7f5e2fb4':
            sendDataToChildBot(
              'AlphaPayNyseBrokBot', 
              '1640352270:AAFf8T8keWtvZIWesVDgxwURuoV1rvCEm9U', 
              usersIdList[id], 
              childBotInfo
            )
            break
          case '5fe4c41ed901302554e20301':
            sendDataToChildBot(
              'AlphaPayBenefitFXBot', 
              '1556293544:AAHjidATflnoz-TtXsx4hS11zMGrce90m7A', 
              usersIdList[id], 
              childBotInfo
            )
            break
          case '5ff582e9d5085f13cee96bc6':
            sendDataToChildBot(
              'AlphaPayTrytonBot', 
              '1695042070:AAG0rD7M5vPtTNnBoVKqrqgw5QxWnke0EmA', 
              usersIdList[id], 
              childBotInfo
            )
            break
          default:
            console.log('Неудачная попытка отправки данных платежному боту')      
        }
      }
    } catch (e) {
      console.log('Попробуйте обновить бота, введя текст "updateBot"')
    }

    res.send('Data were sent')
  } catch (e) {
    console.error(e)
    res.send('Bad request')
  }
})

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayPoolBotToken is runnig on port ${PORT}`))