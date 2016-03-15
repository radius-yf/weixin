var koa = require("koa");
var app = koa();


app.use(function *(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
	console.log('%s %s - %sms', this.method, this.url, ms);
});
app.use(function *(){
	this.body = "hello koa";
});

app.listen(process.env.PORT || 3000, function(){
	console.log("启动成功 url: http://localhost:" + (process.env.PORT || 3000));
});
