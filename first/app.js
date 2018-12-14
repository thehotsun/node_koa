const Koa = require('koa')
const index = require('./router/index')
const DB = require('./conf')
// const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const path = require('path')
const assert = require('assert')
const session = require('koa-session')
// const MongoClient = require('mongodb').MongoClient

// const dbName = 'koa'
// const url = 'mongodb://localhost:27017'
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err)
//   console.log("Connected successfully to server")

//   const db = client.db(dbName)
//   db.collection('user').insertOne({'sex': 'man'}, (err, result) => {
//     // db.close()
//     client.close()
//   })

// })

// let lists = [
//   {
//     name: '岸上',
//     age: 12,
//     hobby: ['basketball', 'game']
//   },
//     {
//     name: '开咯',
//     age: 21,
//     hobby: ['basketball', 'game']
//   },
//   {
//     name: '贫困',
//     age: 123,
//     hobby: ['basketball', 'game']
//   }
// ]
DB.insert('news', {})

const app = new Koa()
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})
app.keys = ['some secret hurr']
const CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 5000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: true /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

app.use(session(CONFIG, app))
// const webpack = require('webpack')
// const webpackConfig = require('./webpack.config')
// const devMiddleware = require('./devMiddleware')
// const hotMiddleware = require('./hotMiddleware')
// app.use(
//   views('views', {
//     extension: 'ejs'
//   })
// )
const static = require('koa-static')
const main = static(__dirname + '/public')
app.use(main)
// app.use(
//   views('views', {
//     map: {
//       html: 'ejs'
//     }
//   })
// )
app.use(bodyparser())
app.use(index.routes())
app.use(index.allowedMethods())

// app.use(views(__dirname + '/views'))

app.listen(3100, () => {
  console.log('asdasd')
})
