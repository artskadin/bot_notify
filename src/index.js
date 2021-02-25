const express = require('express')
const bodyParser = require('body-parser')
const {Telegraf} = require('telegraf')
const botsList = require('./botsList.js')
const fs = require('fs')
const path = require('path')

const sendDataToChildBot = require('./childBot.js')
const { send } = require('process')

const app = express()
const PORT = 3000

const certPath = path.join(__dirname, '../users.json')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bot = new Telegraf(process.env.AlphaPayPoolBotToken)

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
    fs.writeFileSync(certPath, data);
    usersFromUsersList = users
    console.log(`user ${ctx.message.from.username} was added`);
  } catch (error) {
    console.error(error);
  }
})

app.get('/', (req, res) => {
  res.send('server is working')
})

app.post('/', (req, res) => {
  if (req.body.notifyType === 'updateOrderStatus') {
    try {
      let merchantId = req.body.route.extraData.merchantId
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
        merchName: req.body.route.extraData.merchantName ?? 'отсутствует',
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
                process.env.AlphaPayGrowFinanceBotToken, 
                usersIdList[id], 
                childBotInfo
              )
              break
            case '5fcf3e7c391f945a7f5e2fb4':
              sendDataToChildBot(
                'AlphaPayNyseBrokBot', 
                process.env.AlphaPayNyseBrokBotToken, 
                usersIdList[id], 
                childBotInfo
              )
              break
            case '5fe4c41ed901302554e20301':
              sendDataToChildBot(
                'AlphaPayBenefitFXBot',
                process.env.AlphaPayBenefitFXBotToken, 
                usersIdList[id], 
                childBotInfo
              )
              break
            case '5ff582e9d5085f13cee96bc6':
              sendDataToChildBot(
                'AlphaPayTrytonBot', 
                process.env.AlphaPayTrytonBotToken, 
                usersIdList[id], 
                childBotInfo
              )
              break
            case '602fbe8cf4466a503bb655d8':
              sendDataToChildBot(
                'AlphaPaySpaceFXBot',
                process.env.AlphaPaySpaceFXBotToken,
                usersIdList[id], 
                childBotInfo
              )
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
  }
})

bot.launch()
app.listen(PORT, () => console.log(`AlphaPayPoolBotToken is runnig on port ${PORT}`))