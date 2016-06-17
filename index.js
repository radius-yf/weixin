require("babel-register");
require("babel-polyfill");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require('morgan');
const fs = require("fs")

const app = express();

// 中间件
// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// log
app.use(logger('dev'));

// 静态文件
app.use(express.static('static'));

// api
app.use('/api', require("./router/controller").default);
// app.use('/api/weixin', require("./router/weixin").default);

// 404交给前端处理
app.use('/', function(req, res) {
	res.sendFile(`${__dirname}/static/index.html`);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`启动成功 url: http://localhost:${process.env.PORT || 3000}`);
});
