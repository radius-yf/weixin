var koa = require("koa");
var config = require("./config");
var utils = require("./utils");

var app = koa();


app.use(function *(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
	console.log('%s %s - %sms', this.method, this.url, ms);
});

app.use(function *(){
	console.log(this.query);
	if (utils.checkSignature(this.query.signature, this.query.timestamp, this.query.nonce)) {
		this.body = this.query.echostr;
		console.log("success");
	} else {
		this.body = "error";
		console.log("error");
	}
});

app.listen(process.env.PORT || 3000, function(){
	console.log("启动成功 url: http://localhost:" + (process.env.PORT || 3000));
});
