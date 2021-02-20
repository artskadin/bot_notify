const {Telegraf} = require('telegraf')
const axios = require('axios')

const sendDataToChildBot = function(botName, token, userId, data) {
  const message = '<b>Метод зачисления:</b> ' + data.paymentMethod +
  '\n<b>Сумма in:</b> ' + data.amountIn +
  '\n<b>IP адрес:</b> ' + data.ipAdress +
  '\n<b>E-mail:</b> ' + data.email

  const url = encodeURI(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${userId}&text=${message}&parse_mode=HTML`)

  axios.get(url)
    .then(resp => {
        console.log(`post запрос для ${botName} отправился успешно`);
    })
    .catch(err => {
        // Handle Error Here
        console.log(`неуспешный post запрос для ${botName} пользователю ${userId}`);
    });
}

module.exports = sendDataToChildBot