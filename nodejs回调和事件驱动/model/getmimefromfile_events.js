/**
 * Created by HTML on 2019/7/19
 */

//获取后缀名的方法
exports.getMime = function (fs, EventEmitter, extname) {
    fs.readFile('./mime.json', function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        
        let Mimes = JSON.parse(data.toString());
        let mime = Mimes[extname] || 'text/html';
        //这里 通过enevts(事件驱动)返回数据  不通过return返回
        // tips:这里需要通过异步才能监听到广播
        EventEmitter.emit('event', mime);
    });
};
