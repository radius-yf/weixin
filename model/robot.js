import request from "request";
import qs from "querystring";
import Message from "../entity/message";
import Bill from "../entity/bill";
import User from "../entity/user";

const url = "http://www.tuling123.com/openapi/api?";
const key = "ed37d6e5d22c83abc323ff7622c2f8f7";

// 聊天机器人
function chat(content, openid) {
	return new Promise((resolve, reject)=> {
		var param = {
			key: key,
			info: content,
			userid: openid
		};
		request(url + qs.stringify(param) , (err, res, body)=> {
			if(err) reject(err);
			let result = JSON.parse(body).text;

			resolve(result);
		});
	});
}

// $cost 消费
async function cost(money, content, openid) {
	let data = await Bill.create({
		openid,
		content,
		money
	});
	return `记录成功
编号:${data.id}
价格:${data.money}
备注:${data.content}`;
// 使用 $del cost ${data.id} 命令可以删除记录`;
}

// $month 查看本月账单
async function month(openid) {
	let date = new Date();
	let opt = {
		where: {
			createdAt: {
				gte: new Date(date.getFullYear() + "/" + (date.getMonth() + 1)),
				lt: new Date(date.getFullYear() + "/" + (date.getMonth() + 2))
			}
		}
	}
	if (openid) {
		opt.where.openid = openid;
	}
	let data = await Bill.findAll(opt);
	return data.map((item) => `编号:${item.id} 价格:${item.money} 备注:${item.content}`).join("\n")
}


// default
export default async function(msg) {
	let openid = msg.FromUserName;
	let content = msg.Content;

	console.log(msg);
	let is = await isAdmin(openid);
	console.log(is);

	let result = null;
	if (content !== undefined && content !== null && content !== "") {
		if (/^￥(\d+\.?\d{0,2}) (.*)$/.test(content) && is.user) {
			console.log("调用charge");
			result = await cost(RegExp.$1, RegExp.$2, openid);
		} else if (/^\$(.*)$/.test(content) && is.user) {
			console.log("调用usercmd " + isUser(openid));
			result = await user(RegExp.$1, openid);
		} else if (/^#(.*)$/.test(content) && is.admin) {
			result = await admin(RegExp.$1, openid);
		} else {
			console.log("调用chat");
			result = await chat(content, openid);
		}
	}

	Message.create({
		openid,
		content,
		result
	});
	return result;
}


async function isAdmin(openid) {
	let data = await User.findOne({
		where: {
			openid
		}
	});
	return {
		user: data !== null,
		admin: data !== null && data.isAdmin
	}
}
// 功能导航
async function user(cmd, openid) {
	console.log(cmd);
	if (/^month/.test(cmd)) {
		return month(openid);
	}
	return "未找到命令";
}
async function admin(cmd, openid) {
	if (/^month/.test(cmd)) {
		return month();
	}
	return "未找到命令";
}


isAdmin("omR7Qw50GHrKHwzXOYIHu1SmM6XM").then(result => {
	console.log(result.user);
	console.log(result.admin);
})
