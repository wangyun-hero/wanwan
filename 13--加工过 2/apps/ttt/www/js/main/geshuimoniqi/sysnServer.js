var dbName = "HGProjSqlite.db";

function sysnGoodsrate() {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler"; 
	var actionT = "queryByCode";
	var parms = parms = "{'pt_tableCode':'cs_goodsrate','po_goodsrate_code':'ASC'}";
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	
	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successF()", //请求成功后回调js方法
		"error" : "initData()"//请求失败回调的js方法
	});
}

function successF(result) {
    //alert("result.dataInfo: "+result.dataInfo.length);
	initializeBD(result.dataInfo);
}
function initData(){}

function initializeBD(datalist) {
	$ctx.setApp({
		"dbName" : dbName
	});	
	var tabBoolsql = "SELECT * FROM sqlite_master WHERE type='table' AND name='cs_goodsrate';"
	var data = $sqlite.query({
		"db" : dbName,
		"sql" : tabBoolsql
	});
	//alert("data:"+data);
	if (JSON.parse(data).length<1) {
	    //建立模型
	    //alert("create table");
		var sql = "create table cs_goodsrate(_id integer primary key autoincrement,goodsrate_id varchar,goodsrate_code varchar,goodsname varchar,goodstype varchar,unitname varchar,customsvalue varchar,rate varchar,rateyear varchar,filenumber varchar,pid varchar,nodetype varchar)";
		var data = $sqlite.execSql({
			"db" : dbName,
			"sql" : sql
		});
		//同步新数据
		initTableData(datalist);
	}else{
	    //清除旧数据
	    var sql = "delete from cs_goodsrate";
		var data = $sqlite.execSql({
			"db" : dbName,
			"sql" : sql
		});
		//同步新数据
		initTableData(datalist);
	}
	
	var sumsql = "SELECT * FROM sqlite_master WHERE type='table' AND name='cs_goodsratesum';"
	var sumdata = $sqlite.query({
		"db" : dbName,
		"sql" : sumsql
	});
	
	if (JSON.parse(sumdata).length<1) {//判断商品汇总表
		var sql = "create table cs_goodsratesum(_id integer primary key autoincrement,goodsrate_id varchar,goodsrate_code varchar,goodsname varchar,unitname varchar,customsvalue varchar,rate varchar,goodsnumber varchar,userid varchar)";
		var data = $sqlite.execSql({
			"db" : dbName,
			"sql" : sql
		});
	}
}

function initTableData(lists) {
    var len = lists.length;
    var sqls = "";
    for (var i = 0; i<len; i++){
		sqls = "insert into cs_goodsrate(goodsrate_id,goodsrate_code,goodsname,goodstype,unitname,customsvalue,rate,rateyear,filenumber,pid,nodetype) values ('"+lists[i].goodsrate_id+"','"+lists[i].goodsrate_code+"','"+lists[i].goodsname+"','"+lists[i].goodstype+"','"+lists[i].unitname+"','"+lists[i].customsvalue+"','"+lists[i].rate+"','"+lists[i].rateyear+"','"+lists[i].filenumber+"','"+lists[i].pid+"','"+lists[i].nodetype+"')";
		$sqlite.execSql({
			"db" : dbName,
			"sql" : sqls
		})
	}
}