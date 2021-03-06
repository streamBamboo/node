/**
 * Created by HTML on 2019/7/26
 */
/**
 * npm install mongodb --save  安装mongodb
 *
 * let MongoClient = require('mongodb').MongoClient;  引入mongodb的MongoClient
 *
 * let url = 'mongodb://localhost:27017/test';  连接数据库的地址
 *
 * 连接数据库
 *
 * MongoClient.connect(url, (err, db){
 *
 * });
 *
 * 实现增加修改删除
 * MongoClient.connect(url, (err, db) => {
 *      db.collection('user').insertOne({'name': 'zhangsan'}, (error, data) => {
 *
 *      })
 * });
 *
 *
 *
 *
 *
 *
 */

let http = require('http');
let ejs = require('ejs');
let MongoClient = require('mongodb').MongoClient; // 引入数据库 MongoClient

let dbUrl = 'mongodb://localhost:27017/'; // 连接数据库地址  stream表示数据库的名称

let app = require('./model/express-route.js');

http.createServer(app).listen(3000);



let num = 0;
app.get('/add', (req, res) => {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => { // 连接数据库
        if (err) {
            console.log('数据库连接失败', err);
            return;
        }
        num++;
        let dbo = db.db('runoob'); // rouoob 数据库名字
        //增加数据
        dbo.collection('site').insertOne({ // site 集合名
            name: 'zhangsan' + num,
            age: 20
        }, (error, data) => {
            if (error) {
                console.log('增加数据失败', error);
                return false;
            }
            res.send('增加数据成功');
            db.close();// 关闭数据库
        });
    });
});

//查询数据库
app.get('/check', function (req, res) {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, db) => {
        if (err) {
            console.log('数据库连接失败');
            return;
        }
        let dbo = db.db('runoob');
        dbo.collection('site').find().toArray((error, doc) => {
            if (error) throw error;
            console.log(doc);
            ejs.renderFile('views/index.ejs', {list: doc}, (err, data) => {
                res.send(data);
                // db.close();
            });
            
        });
    });
    
});
