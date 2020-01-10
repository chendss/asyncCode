module.exports = {
  pathDict: { // 表示监听的文件夹
    test: '路径',
    test2: '路径'
  },
  url: 'http://d.bjong.me:9988', // 后端地址
  extraList: [ // 排除响应的路径
    '.git',
    'node_modules'
  ],
  ignored: ['**/node_modules/**/*', '**/.git/**/*'], // 跳过监听
  sleepTime: 300 // 表示启动控制的间隔，文件夹越多建议越大
}