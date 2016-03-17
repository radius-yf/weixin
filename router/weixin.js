const wechat = require("wechat");
const config = require("../config");
const robot = require("./robot");

module.exports = wechat(config.weixin, (req,res)=> {
	robot(req.weixin).then(msg=> {
		res.reply(msg);
	})
});
