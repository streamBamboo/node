
// 引入 http模块
var http = require('http');
// 创建web服务器对象（请求和响应）
var server = http.createServer();
//监听请求->响应内容
server.on('request', function(request, response){
  //获取用户请求路径
 // console.log(request.url)
  //console.log('接收到了用户请求')
  //response 是一个对象，  end方法 用来响应用户数据
  //response.end('ok')
  //需求：登录页响应this is login    首页响应this is index
  
  // if(request.url == '/'){
  //   response.end('this is index')
  // }else if(request.url == '/login'){
  //   response.end('this is login')
  // }else {
  //   response.end('404')
  // }
  response.setHeader('content-type','text/html;charset=utf-8');
  response.end('<a href="http://baidu.com">点击进入百度</a>')
});
//启动服务
server.listen(8080,function(){
  console.log('服务器启动成功')
});
