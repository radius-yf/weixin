import request from "request";
import qs from "querystring";
import Message from "../entity/message";

const url = "http://www.tuling123.com/openapi/api?";
const key = "ed37d6e5d22c83abc323ff7622c2f8f7";

async function chat(content, openid) {
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


export default async function(msg) {
	let openid = msg.FromUserName;
	let content = msg.Content;

	console.log(msg);
	let result = null;
	if (content !== undefined && content !== null && content !== "") {
		result = await chat(content, openid);
	}

	Message.create({
		openid,
		content,
		result
	});
	return result;
}
