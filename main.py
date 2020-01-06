from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

文件地址 = "C:\work\project\winshare\winshare-operations-web-pc"

def throttle(fn, gapTime) {
  let _lastTime = null;

  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}


class FileMonitorHandler(FileSystemEventHandler):
    def __init__(self, **kwargs):
        super(FileMonitorHandler, self).__init__(**kwargs)
        # 监控目录 目录下面以device_id为目录存放各自的图片
        self._watch_path = 文件地址

    # 重写文件改变函数，文件改变都会触发文件夹变化

    def on_modified(self, event):
        if not event.is_directory:  # 文件改变都会触发文件夹变化
            file_path = event.src_path
            print("文件改变: %s " % file_path)


if __name__ == "__main__":
    event_handler = FileMonitorHandler()
    observer = Observer()
    observer.schedule(
        event_handler,
        path=文件地址,
        recursive=True  # recursive递归的
    )
    observer.start()
    observer.join()
