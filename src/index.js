const express = require('express')

const { ash } = require('./libs/util')
const FileResource = require('./libs/file.resource')

const { NODE_ENV, HOST = '0.0.0.0', PORT = 1337 } = process.env

const file = FileResource(`${__dirname}/data.log`)

const app = express()

// http://bridge1.soehnle.de/devicedataservice/dataservice

const getWeightInKg = data => parseFloat(parseInt(data.substring(38,42),16))/100.0

app.get('/devicedataservice/dataservice', ash(async (req, res) => {
  const { data } = req.query

  switch(data.substring(0,2)) {
    case '24':
      if (await file.exists() && await fs.writeable()) {
        await file.append(`${(new Date()).toISOString()}\t${getWeightInKg(data)}kg\n`)
      } else {
        next('Logfile not writeable')
      }
      res.send('A00000000000000001000000000000000000000000000000bec650a1')
      break

    case '22':
      res.send('A20000000000000000000000000000000000000000000000c9950d3f')
      break

    case '25':
      res.send('A00000000000000001000000000000000000000000000000bec650a1')
      break

    case '28':
      res.send('A5000000000000000100000000000000000000000000000056e5abd9')
      break

    case '21':
      res.send('A10000000000000009c4914c0000000000000000000000001d095ec4')
      break

    case '29':
      res.send('')
      break

    default:
      console.log(`Something strange was sent: ${data}`)
      res.send('00000')
  }
}))

app.use((er, req, res, next) => {
  if (NODE_ENV !== 'production') {
    console.error(err)
  }

  res.sendStatus(500)
  next()
})

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}...`))
