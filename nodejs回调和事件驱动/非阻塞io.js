/**
 * Created by HTML on 2019/7/22
 */
let fs = require('fs');


function getMime (callback) {
    // 异步
    fs.readFile('mime.json', function (err, data) {
        // return data //  return 会拿不到数据
        callback(data);
    });
}

// 外部调用的时候 拿到的是undefined
// console.log(getMime());//这里输出的是undefined

// 1、通过回调函数  来解决上面无法拿到数据的问题

getMime(function (data) {
    // console.log(data);
});



