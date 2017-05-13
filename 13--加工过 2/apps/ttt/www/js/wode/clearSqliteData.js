var dbName = "HGProjSqlite.db";

function clearData(){
//指定数据库
	$ctx.setApp({
			"dbName" : dbName
	});
//清除个税缓存
   clearGSMNQData();
//清除首页快捷缓存:一般用户定制快捷不用清理，自行管理
//clearSYKJData();

}

function clearGSMNQData(){
	var sqls = "delete from cs_goodsratesum";
	$sqlite.execSql({
		"db" : dbName,
		"sql" : sqls
	});


}

function clearSYKJData(){
   var sqls = "delete from appTab";
   $sqlite.execSql({
		"db" : dbName,
		"sql" : sqls
   });
   
    var sql1 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100001','行邮物品常见问题','on','../../img/index_xywpcjwt.png','5','html/zizhufuwu/xywpcjwtList.html','0')";
	var sql2 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100002','个人税款模拟器','on','../../img/index_gerenshuikuanmoniqi.png','2','html/main/geshuimoniqi/gsSearch.html','0')";
	var sql3 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100003','在线咨询','on','../../img/index_zaixianzixxun.png','10','html/kefuzhongxin/zaixianzixun.html','0')";
	var sql4 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100004','热点问题','on','../../img/index_redianwenti.png','0','html/kefuzhongxin/redianwenti.html','0')";
	var sql5 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100005','政策解读','on','../../img/index_zhengcejiedu.png','0','html/kefuzhongxin/zhengcejiedu.html','0')";
	var sql6 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100006','APP使用帮助','off','../../img/index_appshiyongbangzhu.png','0','html/kefuzhongxin/shiyongbangzhu.html','0')";
	var sql7 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100007','通关状态','off','../../img/index_xywpcjwt.png','0','html/main/tongguanzhuangtai/tongguanzhuangtai.html','0')";
	var sql8 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100008','修撤单','off','../../img/index_xywpcjwt.png','0','html/zizhufuwu/xywpcjwtList.html','0')";
	var sql9 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100009','订阅中心','off','../../img/index_xywpcjwt.png','0','html/zizhufuwu/xywpcjwtList.html','0')";
	var sql10 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100010','舱单查询','on','../../img/index_xywpcjwt.png','11','html/zizhufuwu/xywpcjwtList.html','0')";
	
	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql1
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql2
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql3
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql4
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql5
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql6
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql7
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql8
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql9
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql10
	});
	
}