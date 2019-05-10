//引入官方的fs模块
var fs = require('fs');

//调用fs模块
// fs.readFile('./text.txt', function (err, data) { 没有指定编码
fs.readFile('./text.txt','utf8', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data)
});
