const log = console.log
const fs = require('fs')
const chokidar = require('chokidar')
const axios = require('axios').default
const { pathDict, url, extraList } = require('../clientConfig')

const addAction = function (path, id) {
  axios.post(`${url}/addFile`, {
    path, id
  })
  console.log('测试新增', path, id)
}

const changeAction = function (path, id, filePath) {
  const context = fs.readFileSync(filePath, 'utf8')
  axios.post(`${url}/changeFile`, {
    path, id, context
  })
  console.log('测试变化', context, path, id)
}

const unlinkAction = function (path, id) {
  axios.delete(`${url}/delFile`, {
    data: {
      path, id
    }
  })
  console.log('测试删除', path, id)
}

const unlinkDirAction = function (path, id) {
  axios.delete(`${url}/delDir`, {
    data: {
      path, id
    }
  })
  console.log('测试文件夹删除', path, id)
}

/**
 * 
 *
 * @param {*} basePath
 * @param {FSWatcher} watcher
 * @param {*} id
 */
const watching = function (basePath, watcher, id) {
  const dict = {
    add: addAction,
    change: changeAction,
    unlink: unlinkAction,
    unlinkDir: unlinkDirAction,
  }
  for (let key of Object.keys(dict)) {
    const fun = dict[key]
    watcher.on(key, path => {
      if (extraList.some(p => path.includes(p))) {
        return
      }
      const newPath = path.replace(basePath, '')
      fun(newPath, id, path)
    })
  }
}

const main = function () {
  for (let id of Object.keys(pathDict)) {
    const index = pathDict[id]
    const watcher = chokidar.watch(index, {
      persistent: true
    })
    setTimeout(() => { watching(index, watcher, id) }, 100)
  }
}

main()