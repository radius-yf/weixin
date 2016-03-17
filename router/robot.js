const request = require("request");
const qs = require("querystring");

const url = "http://www.tuling123.com/openapi/api?";
const key = "ed37d6e5d22c83abc323ff7622c2f8f7";

async function chat(info, userid) {
	return new Promise((resolve, reject)=> {
		var param = {
			key: key,
			info: info,
			userid: userid
		};
		request(url + qs.stringify(param) , (err, res, body)=> {
			if(err) reject(err);
			resolve(body);
		});
	});
}
module.exports = async function(msg) {
	var result = await chat(msg.Content, msg.FromUserName);
	var jsonObj = JSON.parse(result);
	return jsonObj.text;
}
