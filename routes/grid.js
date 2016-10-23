var fs = require("fs");
var linq = require("jlinq");

exports.handler  =  function grid(req , res , next) {
	console.log(req.body);
	console.log(linq);
        var rows = parseInt(req.body.rows);
	var page = parseInt(req.body.page);
	var sidx = req.body.sidx;
	var sord = req.body.sord;
	var startNum = rows * (page-1);
	
	
	fs.readFile("zipcode.txt", function(err, data) {
		
		var result = [];
		var zipArray = data.toString().split("\n");

		for(var i=0;  i<zipArray.length; i++){//i<startNum+rows && 
			var zipData = zipArray[i].split(";");
			result.push({
				Id: zipData[0],
				Name: zipData[1],
				Key: zipData[2],
			});
		}// here we have full array
		var a = linq.from(result);
		if(sidx!=undefined&& sidx.length>0){
			
			a.sort(sidx).reverse();
			if(sord != "asc")
			{
				a = a.reverse();				
			}
			
		}	
		var filter = JSON.parse(req.body.filters);
		if(filter.rules.length>0){
			a = a.starts("Name" , filter.rules[0].data)
			//a = a.where("Name" , filter.rules[0].data);
		}
		result = a.skipTake(startNum,rows);
		//filterin
		//let filtered = linq.Utils.createEnumerable(result).where((i)=> ));



		result.total = result.length;
		res.json({
			records : zipArray.length,
			total: zipArray.length / rows + 1,
			rows: result
		});
		
	});
};