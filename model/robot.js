import request from "request";
import qs from "querystring";
import Message from "../entity/message";
import Bill from "../entity/bill";

const url = "http://www.tuling123.com/openapi/api?";
const key = "ed37d6e5d22c83abc323ff7622c2f8f7";

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

async function charge(money, content, openid) {
	let data = await Bill.create({
		openid,
		content,
		money
	});
	console.log(data);
	return "success";
}

export default async function(msg) {
	let openid = msg.FromUserName;
	let content = msg.Content;

	console.log(msg);
	let result = null;
	if (content !== undefined && content !== null && content !== "") {
		if (/^￥(\d+\.?\d{0,2}) (.*)/.test(content)) {
			result = await charge(parseDouble(RegExp.$1), RegExp.$2, openid);
		} else {
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
