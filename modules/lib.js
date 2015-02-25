var bc = require("bcryptjs");
var lib = {};


lib.get_hash_password = function(password){
	return bc.hashSync(password);
};

exports.lib = lib;