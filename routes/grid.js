var fs = require("fs");

exports.handler  =  function grid(req , res , next) {
        var rows = parseInt(req.query.rows);
	var page = parseInt(req.query.page);
	
	var startNum = rows * (page-1);
	
	fs.readFile("zipcode.txt", function(err, data) {
		
		var result = [];
		var zipArray = data.toString().split("\n");
		for(var i=startNum; i<startNum+rows && i<zipArray.length; i++){ 
			var zipData = zipArray[i].split(";");
			result.push({
				Id: zipData[0],
				Name: zipData[1],
				Key: zipData[2],
			});
		}

		result.total = result.length;
		res.json({
			records : zipArray.length,
			total: zipArray.length / rows + 1,
			rows: result
		});
		
	});
};