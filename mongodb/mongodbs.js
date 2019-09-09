/**
 * Created by HTML on 2019/7/24
 */

/**
 *
 *  mongodb 数据库框架的笔记
 *      cls --清屏
 *      show dbs --查看所有数据库列表
 *      use 数据库名  --(创建)/(使用)数据库  数据库要创建成功还需要插入一条数据，没有任何内容数据库创建失败
 *      //数据库中不能直接插入数据，只能往集合(collections)中插入数据,所以
 *      db.表名（集合名）.insert   --往集合里插入数据
 *          例：db.student.insert({“name”:”xiaoming”});  //系统发现 student 是一个陌生的集合名字，所以就自动创建了集合
 *
 *      show collections  --显示当前的数据集合
 *
 *      db.dropDatabase()   --删除数据库，删除当前所在的数据库  删除之前要先运行 use 数据库名
 *
 *      db.集合名.drop()    -- 删除集合，删除指定的集合 删除表
 *
 *      *数据库查询
 *          db.集合名.find()
 *              例：db.userInfo.find({"age": 22});  --查询 age=22
 *                  db.userInfo.find({"age": {$gt22}});  --查询 age>22
 *                  db.userInfo.find({"age": {$lt22}});  --查询 age<22
 *                  db.userInfo.find({"age": {$gte22}});  --查询 age>=22
 *                  db.userInfo.find({"age": {$lte22}});  --查询 age<=22
 *                  db.userInfo.find({"age": {$gte22, $lte30}});  --查询 age>=22 并且 age<=30
 *
 *                  //模糊查询用于搜索
 *                  db.userInfo.find({"name": /mongo/});  --查询 name 中包含 mongo 的数据
 *                  db.userInfo.find({"name": /^mongo/});  --查询 name 中包以 mongo 开头的数据
 *
 *                  //只查询name
 *                  db.userInfo.find({}, {name: 1,}); --查询指定列 name 数据
 *
 *                  //只查询 age
 *                  db.userInfo.find({}, { age: 1}); --查询指定列 age 数据
 *
 *                  //只查询name 和 age
 *                  db.userInfo.find({}, {name: 1, age: 1}); --查询指定列 name 、age 数据
 *
 *                  //只查询name的 数据, 且 age > 25；返回的数据只有name  且age都大于25
 *                  db.userInfo.find({"age": {$gt: 25}}, {name: 1, }); --查询指定列 name 、age 数据, age > 25
 *
 *                  //按照age排序
 *                  db.userInfo.find().sort({age: 1});  --升序
 *                  db.userInfo.find().sort({age: -1});  --降序
 *
 *                  db.userInfo.find().limit(5); --只查询前 5 条数据
 *                  db.userInfo.find().skip(5); --只查询 10 条以后的数据
 *
 *                  //可用于分页，limit 是 pageSize，skip 是第几页*pageSize
 *                  // tips: limit和skip的先后顺序不影响结果
 *                  db.userInfo.find().limit(10).skip(5); --查询在 5-10 之间的数据
 *
 *                  // or与查询
 *                  db.userInfo.find({$or:[{age:22},{age.25}]})  --查询 age=22 并且 age=25
 *
 *                  //查询第一条数据
 *                  db.userInfo.findOne()
 *
 *                  //查询集合的数量/长度
 *                  db.userInfo.find().count()  --查询某个结果集的记录条数 统计数量
 *
 *                  db.userInfo.find({"age":{$gte:25}}).count()   --查询 age 大于等于 25 的数量
 *
 *
 *      *修改数据
 *          // 数据修改
 *          db.student.update({"name":"小明"},{$set:{"age":16}});  --查找名字叫做小明的，把年龄更改为 16 岁：
 *          // 数据替换--全部替换
 *          db.student.update({"name":"小明"},{"name":"大明","age":16}); --完整替换，不出现$set 关键字了
 *          // 删除borough这条数据
 *          db.collectionsNames.remove( { "borough": "Manhattan" } ) -- 删除数据
 *
 *          db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )  -- justOne 只删除一条  删除最前面那条
 *
 *          //下面这两个update 的false，true的顺序不影响结果
 *          db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true); -- $inc 找到name为Lisi的  给他的age 增加 50
 *
 *          db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true); -- $inc 找到name为Lisi的  给他的age 增加 50 并且改名为hoho
 *
 *
 *
 *
 *      *索引搜索
 *          // 创建索引
 *          db.user.ensureIndex({"username":1})
 *
 *          //获取当前集合索引
 *          db.user.getIndexes()
 *
 *          //删除索引
 *          db.user.dropIndex({"username":1})
 *
 *
 *
 *
 *
 *
 *
 */

//http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/

/*
 nodejs操作mongodb数据库
 
 1.安装mongodb、
 
 cnpm install mongodb --save
 
 
 2.引入mongodb下面的MongoClient
 var MongoClient = require('mongodb').MongoClient;
 
 
 3.定义数据库连接的地址 以及配置数据库
 qianfeng数据库的名称
 
 var url = 'mongodb://localhost:27017/';
 
 var dbName = 'shop'
 
 
 4.nodejs连接数据库
 
 
 MongoClient.connect(url,function(err,client){
 
 const db = client.db(dbName);  数据库db对象
 
 })
 
 5.操作数据库
 
 
 
 MongoClient.connect(url,function(err,client){
 
 const db = client.db(dbName);  数据库db对象
 
 
 MongoClient.connect(url,function(err,db){
 
 
 
 db.collection('user').insertOne({"name":"张三"},function(err,result){
 
 db.close() //关闭连接
 })
 
 })
 
 })
 
 
 */
var MongoClient = require('mongodb/mongodbs').MongoClient;


//定义连接数据库的地址

const  url = 'mongodb://localhost:27017/';
var dbName = 'shop'

//连接数据库
MongoClient.connect(url,(err,client)=>{
    
    if(err){
        console.log('数据连接失败');
        return false;
    }
    let db=client.db(dbName);   /*获取db对象*/
    
    db.collection("admin").insertOne({"name":"mongodb3.0","age":10},function(err){
        
        if(err){
            console.log('增加失败');
            return false;
        }
        console.log('增加成功');
        client.close();  /*关闭数据库*/
    })
    
    
})

