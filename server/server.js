const express = require('express')
const rollbar = require("rollbar");
const app = express()
const bodyParser = require('body-parser')

if(process.env.ROLLBAR_ACCESS_TOKEN) rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

app.set('port', process.env.PORT || 5000)

app.use(
  bodyParser.raw({
    inflate: true,
  })
)

app.use((req, res, next) => {
  req.rawBody = ''
  req.setEncoding('utf8')

  req.on('data', chunk => req.rawBody += chunk)

  req.on('end', next)
})

const get = require('./methods/get');

get(app);

app.use(express.static('public'))

const listen = () =>
  app.listen(app.get('port'), () => console.log(`Crossorig.in on port ${app.get('port')}`))

module.exports = { listen };
