//引入官方的fs模块
var fs = require('fs');
//调用成员writeFile创建文件
fs.writeFile('./text.txt','hello 小渣渣', function(err){
  //err有数据 则写入失败
  //err无数据 则写入成功
  if(err){
    console.log(err)
    return;
  }
  console.log('写入成功')
})
