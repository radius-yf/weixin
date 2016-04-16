import wechat from "wechat";
import config from "../config";
import robot from "../model/robot";

export default wechat(config.weixin, (req,res)=> {
	robot(req.weixin).then(msg=> {
		res.reply(msg);
	});
});
