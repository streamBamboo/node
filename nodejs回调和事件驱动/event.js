/**
 * Created by HTML on 2019/7/22
 */

let fs = require('fs');
let events = require('events');

//先 实例化 EventsEmitter
let EventsEmitter = new events.EventEmitter();

//广播和接收广播

EventsEmitter.on('to_mime', function (data) {
    console.log('接收到了这个广播事件',data);
});

//监听to_parent的广播
EventsEmitter.on('to_parent', function (data) {
    console.log('接收到了这个广播事件',data);
    // EventsEmitter.emit('to_mime', '发送的数据mime');
});

/*setTimeout(function () {
    console.log('开始广播');
    //广播to_parent事件
    EventsEmitter.emit('to_parent', '发送的数据');
},2000);*/

// events demo
//2、nodejs  通过events（事件驱动）来  解决异步 无法拿到数据的问题


function getMime () {
    // 异步
    fs.readFile('mime.json', function (err, data) {
        // return data //  return 会拿不到数据
        //通过 广播  把data传给监听广播   处理异步无法拿到数据的问题
        EventsEmitter.emit('to_parent', data);
    });
}

getMime();




