var sqlite3 = require("sqlite3").verbose();

var _insertPlayer = function(userData,db,onComplete){
	var insertQuery = "insert into players(email, user_name) values('"+
						userData.email+"','"+userData.user_name+"');";
	db.run(insertQuery, onComplete);
};

var _getPlayerInfo = function(email,db,onComplete){
	var selectQuery = "select * from players where email = '"+ email +"';";
	db.get(selectQuery, onComplete);
};

var init = function(location){	
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var onDBOpen = function(err){
				if(err){onComplete(err);return;}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location,onDBOpen);
		};	
	};

	var records = {		
		insertPlayer: operate(_insertPlayer),
		getPlayerInfo: operate(_getPlayerInfo)
	};
	return records;
};

exports.init = init;
