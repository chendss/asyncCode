
const fs = require('fs')
const rimraf = require('rimraf')
const router = require('koa-router')()
const config = require('../serverConfig')
const { log, mkdirForSrc } = require('./tools')

const changeFile = function (id, path, context, msg) {
  const index = config[id]
  const p = `${index}${path}`
  mkdirForSrc(p)
  fs.writeFileSync(p, context, () => {
    log(msg, index, path)
  })
}

router.post('/addFile', async (ctx) => {
  let data = ctx.request.body
  const { id, path } = data
  changeFile(id, path, '', '添加文件')
  ctx.response.body = {
    status: '成功'
  }
})

router.post('/changeFile', async (ctx) => {
  let data = ctx.request.body
  const { id, path, context } = data
  changeFile(id, path, context, '修改文件')
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