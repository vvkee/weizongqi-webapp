'use strict';
let app = require('koa')();


module.exports = (callback) => {
    app.use(async (next) => {
        let start = new Date()

        await next

        let ms = new Date() - start

        console.log('%s %s - %s', this.method, this.url, ms);
    });

    app.use(async (next) => {
        this.body = 'Hello World';
    });

    app.listen(3000);
}
