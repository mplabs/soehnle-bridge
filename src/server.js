const express = require('express')

const { HOST = '0.0.0.0', PORT = 1337 } = process.env

const app = express()

// http://bridge1.soehnle.de/devicedataservice/dataservice

const handleData = data => {
  const weight = parseFloat(parseInt(data.substring(38,42),16))/100.0
  console.log(`Scale reported ${weight}kg`)
}

app.get('/devicedataservice/dataservice', (req, res) => {
  let response = ''
  const { data } = req.query

  switch(data.substring(0,2)) {
    case '24':
      handleData(data)
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
      console.log(`Something strange was send: ${data}`)
      res.send('00000')
  }
})

app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}...`))
