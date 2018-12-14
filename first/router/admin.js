const router = require('koa-router')()

router.get('/qq', (ctx, next) => {
  ctx.body = 'shuang'
})
router.get('/', (ctx, next) => {
  ctx.body = 'sh'
})

module.exports = router.routes()
