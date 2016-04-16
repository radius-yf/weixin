require("babel-register");
require("babel-polyfill");
const express = require("express");

const app = express();

app.use('/', require("./router/index").default);
// 微信
app.use('/weixin', require("./router/weixin").default);

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`启动成功 url: http://localhost:${process.env.PORT || 3000}`);
});
