'use strict';

let app = require('koa')()

app.use( function *(next){
    let strat = new Date()
    yield next
    let ms = new Date - strat

    console.log('%s %s - %s', this.method, this.url, ms);
})

app.use( function *(){
    this.body = 'Hello World9999'
})

app.listen(3030);
