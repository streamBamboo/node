/**
 * Created by HTML on 2019/8/13
 */

/*
 *
 *   nodejs 操作 mongodb 数据库
 *
 *   npm install mongodb --save 安装mongodb数据库
 * */

// 引入 mongodb 的 MongoClient
const MongoClient = require('mongodb').MongoClient;


// 定义数据库地址, 数据库名称
let dbUrl = 'mongodb://localhost:27017/';

let dbName = 'koa';

// 连接数据库--增加数据


/*MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    
    // 选择数据库名称
    let db = client.db(dbName);
    
    // 增加数据
    
    db.collection('user').insertOne({username: '王五', age: 33, sex: '男', status: 1}, (err, res) => {
        if (!err) {
            console.log('增加成功');
            client.close();
        }
    });
    
});*/


// 连接数据库--查询数据

MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
        return;
    }
    
    // 选择数据库名称
    let db = client.db(dbName);
    
    // 查询数据
    
    let result = db.collection('user').find({});
    
    result.toArray((err, docs) => {
        console.log(docs);
    
    })
    
});
