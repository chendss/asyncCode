const log = console.log
const fs = require('fs')
const path = require('path')

const mkdirsSync = function (dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath))
  }
  fs.mkdirSync(dirpath)
}

/**
 * 获得文件的文件夹地址
 *
 * @param {String} src
 */
const dirPath = function (src) {
  const dirList = src.split('\\')
  dirList.pop()
  return dirList.join('\\')
}

const mkdirForSrc = function (src) {
  const dirPath_ = dirPath(src)
  mkdirsSync(dirPath_)
}

const toArray = function (source) {
  if (source instanceof Array) {
    return source
  }
  return [source].filter(item => item)
}

module.exports = {
  log, mkdirForSrc, toArray
}