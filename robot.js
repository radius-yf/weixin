const request = require("request");
const qs = require("querystring");

const url = "http://www.tuling123.com/openapi/api?";
const key = "ed37d6e5d22c83abc323ff7622c2f8f7";

function chat(info, userid) {
	var param = {
		key: key,
		info: info,
		userid: userid
	};
	request(url + qs.stringify(param) , (err, res, body)=> {
		console.log(body);
	});
}

module.exports = function(msg) {
	chat(msg.Content, msg.FromUserName);
}
