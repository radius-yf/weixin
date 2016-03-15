var crypto = require("crypto");
var config = require("./config");

var shasum = crypto.createHash('sha1');
function _checkSignature(signature, timestamp, nonce) {
	var token = config.token;
	var arr = [token, timestamp, nonce];
	arr.sort();
	shasum.update(arr.join(''));
	return shasum.digest('hex') == signature;
}
module.exports = {
	checkSignature: _checkSignature
};
