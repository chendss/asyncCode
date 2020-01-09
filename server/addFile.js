
const fs = require('fs')
const router = require('koa-router')()
const config = require('../serverConfig')
const { log, mkdirsSync } = require('./tools')

router.post('/addFile', async (ctx) => {
  let data = ctx.request.body
  const { id, path } = data
  const index = config[id]
  log('添加文件', index, path)
  fs.writeFile(`${index}${path}`, '', () => { })
  ctx.response.body = {
    status: '成功'
  }
})

module.exports = router