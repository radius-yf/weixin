var koa = require("koa");
var wechat = require('co-wechat');
var config = require("./config");

var app = koa();

app.use(wechat(config.weixin).middleware(function *() {
	this.body = "hello radius";
}));
app.listen(3000);