
// 引入 http模块
var http = require('http');
// 创建web服务器对象（请求和响应）
//监听请求->响应内容
http.createServer( function(request, response){
  //获取用户请求路径
  //需求：登录页响应this is login    首页响应this is index
  response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  response.end('<a href="http://baidu.com">点击进入w百度!!!!!</a>')
}).listen(8081,function(){
  console.log('服务器启动成功')
});
