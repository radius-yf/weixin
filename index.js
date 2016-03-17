const express = require("express");
const wechat = require("wechat");
const config = require("./config");
const robot = require("./robot")

const app = express();

app.use('/', require("./router/index"));
// 微信
app.use('/weixin', wechat(config.weixin, (req,res)=>{
	res.reply(robot(req.weixin));
}));

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`启动成功 url: http://localhost:${process.env.PORT || 3000}`);
});
