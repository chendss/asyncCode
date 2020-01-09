const chokidar = require('chokidar')
const { pathDict, url } = require('../clientConfig')
const axios = require('axios').default


const addAction = function (path, id) {
  axios.post(`${url}/addFile`, {
    path, id
  })
  console.log('测试新增', path, id)
}

const changeAction = function (path, id) {
  console.log('测试变化', path, id)
}

const unlinkAction = function (path, id) {
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
      const newPath = path.replace(basePath, '')
      fun(newPath, id)
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