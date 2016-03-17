var Router = require("koa-router");
var wechat = require('co-wechat');
var config = require("../config");

var router = new Router();

router.all('/weixin', wechat(config.weixin).middleware(function *() {
	this.body = "hello koa";
}));

module.exports = router;
