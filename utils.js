var crypto = require("crypto");
var config = require("./config");

function _checkSignature(signature, timestamp, nonce) {
	var token = config.token;
	var arr = [token, timestamp, nonce];
	arr.sort();
	var shasum = crypto.createHash('sha1');
	var c = arr.join('');
	console.log("c = " + c);
	shasum.update(c);
	var d = shasum.digest('hex');
	console.log("d = " + d);
	return d == signature;
}
module.exports = {
	checkSignature: _checkSignature
};
