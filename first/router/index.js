
// import { log } from 'util';
const DB = require('../conf')
const router = require('koa-router')()
const ss = require('./admin')
router.use('/kk', ss)
router.get('/', async (ctx, next) => {
  ctx.cookies.set('name', 'qq', {
    maxAge: 60*1000*60,
    httpOnly: false
  })
  ctx.session.info = 'test'
  let lists 
  await DB.find('news').then(res => {
    lists = res
    console.log(res, '222')
  })
  await ctx.render('admin/admin', {
    lists
  })
})

router.get('/ss/:ss', (ctx, next) => {
  let a = ctx.params
  console.log(a)
  let b = a.ss
  ctx.body = b
})

router.get('/art', async (ctx, next) => {
  // let cookie = ctx.cookies
  console.log(ctx.session.info)
  await ctx.render('art', {
    jj: 'fujj'
  })
})

router.post('/new', async (ctx, next) => {
  let data = ctx.request.body
  // let data = await disposal(ctx)
  console.log(data)
  ctx.body = data
} )

function disposal (ctx) {
  let a = ''
  return new Promise(function (resolve, reject) {
    try {
      ctx.req.on('data', data => {
        a += data
      })
      ctx.req.on('end', data => {
        resolve(a)
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = router
