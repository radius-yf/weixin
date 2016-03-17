var wechat = require('wechat');
var config = require("../config");

var router = require("express").Router();

router.all('/enterprise', wechat(config.enterprise)
	.text(function(message,req,res,next){
		res.send(message);
	})
.middlewarify());

module.exports = router;
