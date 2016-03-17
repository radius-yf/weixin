require("babel-core/register");
require("babel-polyfill");
const express = require("express");
const config = require("./config");

const app = express();

app.use('/', require("./router/index"));
// 微信
app.use('/weixin', require("./router/weixin"));

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`启动成功 url: http://localhost:${process.env.PORT || 3000}`);
});
