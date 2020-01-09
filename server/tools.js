const log = console.log
const fs = require('fs')
const path = require('path')

const mkdirsSync = function (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
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