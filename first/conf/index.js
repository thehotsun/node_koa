const CONF = require('./conf')

const MongoClient = require('mongodb').MongoClient

class DB {
  constructor() {
    this.dbClient = ''
  }
  static getInstance() {
    if (DB.instance) {
      return DB.instance
    } else {
      return (DB.instance = new DB())
    }
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(
          CONF.url,
          (e, client) => {
            if (e) {
              reject(e)
            } else {
              this.dbClient = client
              resolve(this.dbClient)
            }
          }
        )
      } else {
        resolve(this.dbClient)
      }
    })
  }
  async insert(name, obj) {
    this.connect().then(() => {
      this.dbClient
        .db(CONF.dbName)
        .collection(name)
        .insert(obj, (e, result) => {
          if (e) {
          } else {
            // console.log(result)
          }
        })
    })
  }
  find(name, field = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        let data = this.dbClient
          .db(CONF.dbName)
          .collection(name)
          .find(field)
        data.toArray(function(err, docs) {
          if (err) {
             reject(err)
          } else {
            resolve(docs)
          }
        })
      })

    })
  }
  update() {}
  remove() {}
}

module.exports = DB.getInstance()
