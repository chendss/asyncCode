
const fs = require('fs')
const router = require('koa-router')()
const config = require('../serverConfig')
const { log, mkdirForSrc } = require('./tools')

router.post('/addFile', async (ctx) => {
  let data = ctx.request.body
  const { id, path } = data
  const index = config[id]
  const p = `${index}${path}`
  log('添加文件', index, path)
  mkdirForSrc(p)
  fs.writeFile(p, '', () => { })
  ctx.response.body = {
    status: '成功'
  }
})

module.exports = router