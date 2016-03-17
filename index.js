const koa = require("koa");
var wechat = require('co-wechat');
var config = require("./config");
var weixin = require("./router/weixin");

var app = koa();

app.use(weixin.routes());
app.listen(3000);
