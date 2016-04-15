const request = require("request");
const qs = require("querystring");
import Message from "../model/message";

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
			Message.create({
				openid,
				content,
				result
			});
			resolve(result);
		});
	});
}
module.exports = async function(msg) {
	return chat(msg.Content, msg.FromUserName);
}
