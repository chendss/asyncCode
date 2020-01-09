const log = console.log
const fs = require('fs')
const chokidar = require('chokidar')
const axios = require('axios').default
const { pathDict, url, extraList, ignored } = require('../clientConfig')

let keepList = [], sleep = true

const sleepControl = function () {
  console.time('文件开始监听，加载耗时')
  const interval = setInterval(() => {
    for (let i = 0; i < 20; i++) {
      if (keepList.length !== 0) {
        keepList.pop()
      } else {
        sleep = false
        console.timeEnd('文件开始监听，加载耗时')
        clearInterval(interval)
        break
      }
    }
  }, 100)
}

const addAction = function (path, id) {
  axios.post(`${url}/addFile`, {
    path, id
  })
}

const changeAction = function (path, id, filePath) {
  const context = fs.readFileSync(filePath, 'utf8')
  axios.post(`${url}/changeFile`, {
    path, id, context
  })
}

const unlinkAction = function (path, id) {
  axios.delete(`${url}/delFile`, {
    data: {
      path, id
    }
  })
}

const unlinkDirAction = function (path, id) {
  axios.delete(`${url}/delDir`, {
    data: {
      path, id
    }
  })
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
      keepList.push(false)
      if (sleep === true || extraList.some(p => path.includes(p))) {
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
      ignored,
      interval: 1000,
      persistent: true,
    })
    watching(index, watcher, id)
  }
  setTimeout(sleepControl, 300)
}

main()