/**
 * Created by Administrator on 2018/3/17 0017.
 */
    
    //DB库
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const Config = require('./config.js');

class Db {
    /**
     * 单例  解决多次实例化  实例不共享的问题
     * @returns {Db}
     */
    static getInstance () {
        
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    
    /**
     * 初始化
     */
    constructor () {
        
        this.dbClient = ''; //属性  放db对象
        this.connect();   //实例化的时候就连接数据库
        
    }
    
    /**
     *  连接数据库
     * @returns {Promise<any>}
     */
    connect () {
        return new Promise((resolve, reject) => {
            // 解决数据库多次连接的问题
            if (!this.dbClient) {
                MongoClient.connect(Config.dbUrl, {useNewUrlParser: true}, (err, client) => {
                    
                    if (err) {
                        reject(err);
                        
                    } else {
                        this.dbClient = client.db(Config.dbName);
                        resolve(this.dbClient);
                    }
                });
            } else {
                resolve(this.dbClient);
            }
        });
    }
    
    /**
     *  查找数据
     * @param collectionName 集合名称
     * @param json 查询数据条件
     * @returns {Promise<any>}
     */
    find (collectionName, json) {
        
        return new Promise((resolve, reject) => {
            
            this.connect().then((db) => {
                
                var result = db.collection(collectionName).find(json);
                
                result.toArray((err, docs) => {
                    
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs);
                });
                
            });
        });
    }
    
    /**
     *  更新数据
     * @param collectionName 集合名称
     * @param oldJson 要更新掉的旧数据
     * @param newJson  新数据
     * @returns {Promise<any>}
     */
    update (collectionName, oldJson, newJson) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(oldJson, {
                    $set: newJson
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
    
    /**
     *  插入数据
     * @param collectionName 集合名称
     * @param json 要插入的数据
     * @returns {Promise<any>}
     */
    insert (collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
        
    }
    
    /**
     *  删除数据
     * @param collectionName 集合
     * @param json 删除的数据
     * @returns {Promise<any>}
     */
    remove(collectionName, json){
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
    
    /**
     * mongodb 里面查询_id 把字符串转换成对象
     * @param id
     * @returns {*}
     */
    getObjectID(id){
        return new ObjectID(id)
    }
}


module.exports = Db.getInstance();
