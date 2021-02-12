import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>This shit is working</h1>')
})

app.listen(3000, () => console.log('server is runnig on port 3000'))