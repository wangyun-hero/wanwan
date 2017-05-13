var dbName = "HGProjSqlite.db";

function loadDataAll() {
	var sql = "select distinct  _id,appCode,name,appstate,imgPath,msgNum,srcPath,degrate from appTab";
	var data = $sqlite.query({
		"db" : dbName,
		"sql" : sql
	});

	var json = JSON.parse(data);
	return json;

}

function getChecked() {//得到批量处理的codes
	var objs = window.document.getElementsByName('codes');
	var i;
	var idArray = new Array();
	var j = 0;
	for ( i = 0; i < objs.length; i++) {
		if (objs[i].type == 'checkbox') {
			if (objs[i].checked == true) {
				//idArray[j] = objs[i].value;
				idArray[j] = objs[i].id;
				j = j + 1;
			}
		}
	}
	return idArray;
}

function getNoChecked() {//得到批量处理的codes
	var objs = window.document.getElementsByName('codes');
	var i;
	var idArray = new Array();
	var j = 0;
	for ( i = 0; i < objs.length; i++) {
		if (objs[i].type == 'checkbox') {
			if (objs[i].checked != true) {
				//idArray[j] = objs[i].value;
				idArray[j] = objs[i].id;
				j = j + 1;
			}
		}
	}
	return idArray;
}

function updateMessForLess(codes) {
	var len = codes.length;
	var sql = "";
	for (var l = 0; l < len; l++) {
		sql = "update appTab set appstate='off' where appCode='" + codes[l] + "'";
		$sqlite.execSql({
			"db" : dbName,
			"sql" : sql
		});
	}
	//alert("取消了:" + len+"个应用");
	return len;
}

function updateMessForAdd(codes) {
	var len = codes.length;
	var sql = "";
	for (var l = 0; l < len; l++) {
		sql = "update appTab set appstate='on' where appCode='" + codes[l] + "'";
		$sqlite.execSql({
			"db" : dbName,
			"sql" : sql
		});
	}
	//alert("新增了:" + len+"个应用");
	return len;
}

function getMessToSubmite() {//app定制
	//alert("提交信息");
	var codesLess = new Array();
	codesLess = getNoChecked();
	//alert("codes:"+codes);
	var lenless = updateMessForLess(codesLess);
	//alert("恭喜你,成功取消了"+len+"个应用！");
	
	var codesAdd = new Array();
	codesAdd = getChecked();
	//alert("codes:"+codes);
	var lenadd = updateMessForAdd(codesAdd);
	//alert("恭喜你,成功订阅了"+lenadd+"个应用！");	
	//window.parent.frames["main"].location.reload();
	summer.execScript({
	        "winId" : "root",
			"frameId" : "main",
	        "script" : "ref()" 
	});
	summer.closeWin();
}

var AppModelOperation = function() {};
var appModelOperation = new AppModelOperation();
summerready = function() {
    var header = $summer.byId("pageHeader");
   	$summer.fixStatusBar(header);	
	var jsonArray = loadDataAll();
	appModelOperation.data = ko.observableArray(jsonArray);
	ko.applyBindings(appModelOperation, document.getElementById("applistviews"));
}