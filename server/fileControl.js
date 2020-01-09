
const fs = require('fs')
const rimraf = require('rimraf')
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

router.delete('/delFile', async (ctx) => {
  let data = ctx.request.body
  const { id, path } = data
  const index = config[id]
  const p = `${index}${path}`
  if (fs.existsSync(p)) {
    rimraf(p, () => {
      log('删除文件', index, path)
    })
  } else {
    log('文件不存在', index, path)
  }
  ctx.response.body = {
    status: '成功'
  }
})

router.delete('/delDir', async (ctx) => {
  let data = ctx.request.body
  const { id, path } = data
  const index = config[id]
  const p = `${index}${path}`
  if (fs.existsSync(p)) {
    rimraf(p, () => {
      log('删除文件文件夹', index, path)
    })
  } else {
    log('文件夹不存在', index, path)
  }
  ctx.response.body = {
    status: '成功'
  }
})

module.exports = router