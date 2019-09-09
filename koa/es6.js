/**
 * Created by HTML on 2019/7/30
 */

/**
 *
 *  es6 温习
 *
 *  let、const 是一个块作用域
 *  const 是一个常量  不可改变
 *
 *  这种叫模板字符串
 *  console.log(`${name}`的${age})
 *
 *
 *  方法的简写
 *
 *  var name = 'zhangsan'
 *
 *  var app = {
 *      name  //省略了一个name
 *  }
 *
 *  var name = 'zhangsan'
 *
 *  var app = {
 *      name,  //省略了一个name
 *      // 属性的简写
 *      run(){
 *          console.log('跑步')
 *      }
 *  }
 *  箭头函数  this 指向上下文
 *
 *
 *  async   让方法变成异步
 *
 *
 *
 *  await 等待异步方法执行完成,可以获取异步方法里面的数据，但是必须得用在异步方法里面
 */

// async 例子: 返回一个异步Promise方法

/*async function getData () {
 return '这是一个数据';
 }
 
 console.log(getData()); //Promise { '这是一个数据' }
 
 let p = getData();*/

//获取async 里面的数据 方法一
/*p.then((data) => {
 console.log(data);
 });*/

//await 例子
/*async function test () {
 let d = await getData();
 console.log(d);
 }
 
 test();*/

// await 阻塞的功能，把异步改成同步

/*async function getData () {
 console.log(2);
 return '这是一个数据';
 }
 
 async function test () {
 console.log(1);
 let d = await getData();
 console.log(d);
 console.log(3);
 }
 
 test(); */// 1-2-3


//async await Promise  结合使用   async await ES7新知识
//async 定义的方法返回的是Promise对象
function getData () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let username = '张三';
            resolve(username);
        }, 1000);
    });
}

async function test () {
    
    let data = await getData();
    console.log(data);
}

test();
