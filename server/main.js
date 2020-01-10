const json = require('koa-json')
const cors = require('koa2-cors')
const app = new (require('koa'))()
const { toArray } = require('./tools')
const fileControl = require('./fileControl')
const bodyparser = require('koa-bodyparser')
const { host, port } = require('../serverConfig')

const routerArray = function () {
  return [
    fileControl
  ]
}

const registerRoute = function (routeList) {
  const list = toArray(routeList)
  for (let r of list) {
    app.use(r.routes(), r.allowedMethods())
  }
}

const registered = function () {
  app.use(cors())
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  app.use(json())
}


const main = function () {
  registered()
  registerRoute(routerArray())
  app.listen(port, host)
}

main()