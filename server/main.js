const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const addFileRoute = require('./addFile')

const registered = function () {
  app.use(cors())
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  app.use(json())
  app.use(addFileRoute.routes(), addFileRoute.allowedMethods())
}

const registeredApi = function () {
  app.use(async ctx => {
    ctx.body = 'Hello World'
  })
}


const main = function () {
  registered()
  registeredApi()
  app.listen(9988)
}

main()