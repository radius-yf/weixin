import request from "request"
import qs from "querystring"
import Message from "../entity/message"
import Bill from "../entity/bill"
import User from "../entity/user"
import Route from "./route"

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

const robot = Route();
robot.use("$",admin);
robot.use("#",superAdmin);
// default
export default async function(msg) {
	let openid = msg.FromUserName;
	let content = msg.Content;
	let req = {
		openid,
		content
	};
	let res = {};

	if (/^(\$|#)(\s|[a-zA-Z])/.test(content)) {
		robot(req, res, [RegExp.$1, ...content.substring(1).split(" ").filter(i => i!=="")]);
	} else {
		res.body = await chat(content, openid);
	}

	Message.create({
		openid,
		content,
		result: res.body
	});
	return res.body;
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
