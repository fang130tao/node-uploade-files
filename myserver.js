const port = 8039;
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const upload = require('./routes/upload')

app.use(bodyParser());  // post 参数封装

app.use(koaStatic('./static', {
    hidden: true,
    maxage: 365*24*3600*1000
}));

app.use(upload.routes());

app.listen(port, function(){
    console.log('启动成功，监听端口： ' + port);
});

