'use strict';
import co from 'co'
import koa from 'koa'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import ejs from 'koa-ejs'
import koaStatic from 'koa-static'
import convert from 'koa-convert'
import path from 'path'

import config from './config'

const app = new koa()


// 错误处理
app.on('error', (err, ctx) => {
    console.log(err)
})
onerror(app)

// 静态模板
app.use(convert((koaStatic(path.join(__dirname,'public')))))

ejs(app, {
       root: path.join(__dirname, 'views/pages'),
     layout: false,
    viewExt: 'html',
      cache: false,
      debug: true
})

app.use(async (ctx, next) => {
    ctx.render = co.wrap(ctx.render)
    await next();
})
// 使用日志中间件
app.use(convert(logger()))

// 路由中间件
app
  .use(config.router.routes())
  .use(config.router.allowedMethods())

app.listen(3030);
