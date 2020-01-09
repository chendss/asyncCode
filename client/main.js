const chokidar = require('chokidar')
const { pathDict } = require('../clientConfig')
const axios = require('axios').default

const watching = function (basePath, watcher, id) {
  watcher.on('add', path => {
    const newPath = path.replace(basePath, '')
    axios.post('http://localhost:9988/addFile', {
      path: newPath, id
    })
    console.log('测试新增', newPath, id)
  })
  watcher.on('change', path => {
    const newPath = path.replace(basePath, '')
    console.log('测试变化', newPath, id)
  })
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