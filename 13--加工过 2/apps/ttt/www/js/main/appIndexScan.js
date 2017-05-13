var dbName = "HGProjSqlite.db";

function initTable() {
	var sql = "create table appTab(_id integer primary key autoincrement,appCode varchar,name varchar,appstate varchar,imgPath varchar,msgNum varchar,srcPath varchar,degrate varchar)";
	var data = $sqlite.execSql({
		"db" : dbName,
		"sql" : sql
	});

}

function initTableData() {
	var sql1 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100001','个人税款模拟计算器','on','../../img/index_gerenshuikuanmoniqi.png','5','html/main/geshuimoniqi/gsSearch.html','0')";
	var sql2 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100002','个人邮包查询','on','../../img/index_gerenyoubaochaxun.png','2','html/zizhufuwu/gerenyoubao/gerenyoubao.html','0')";
	var sql3 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100003','行邮物品常见问题','on','../../img/index_xywpcjwt.png','10','html/zizhufuwu/xywpcjwtList.html','0')";
	var sql4 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100004','通关状态查询','off','../../img/index_tongguanzhuangtai.png','0','html/main/xiaoxi/developping.html','0')";
	var sql5 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100005','舱单查询','off','../../img/index_cangdanchaxun.png','0','html/main/xiaoxi/developping.html','0')";
	/*var sql6 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100006','运输工具','off','../../img/index_yunshuGJ.png','0','html/main/xiaoxi/developping.html','0')";*/
	var sql7 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100007','企业信用公示信息查询','off','../../img/index_qiyexinyong.png','0','html/main/xiaoxi/developping.html','0')";
	var sql8 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100008','企业基本信息查询','off','../../img/index_qiguanxinxi.png','0','html/main/xiaoxi/developping.html','0')";
	var sql9 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100009','知识产权备案查询','off','../../img/index_zhishichanquanBA.png','0','html/main/xiaoxi/developping.html','0')";
	var sql10 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100010','行政审批进度查询','off','../../img/index_xingzhengSPJD.png','11','html/main/xiaoxi/developping.html','0')";
	var sql11 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100011','行政审批服务指南','on','../../img/index_xingzhengSPFWZN.png','11','html/zizhufuwu/fuwuzhinanList.html','0')";
	var sql12 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100012','政策解读','on','../../img/index_zhengcejiedu.png','11','html/kefuzhongxin/zhengcejiedu.html','0')";
	var sql13 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100013','热点问题','on','../../img/index_redianwenti.png','11','html/kefuzhongxin/redianwenti.html','0')";
	var sql14 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100014','在线咨询','on','../../img/index_zaixianzixxun.png','11','html/kefuzhongxin/zaixianzixun.html','0')";
	var sql15 = "insert into appTab(appCode,name,appstate,imgPath,msgNum,srcPath,degrate) values ('STT100015','APP使用帮助','on','../../img/index_appshiyongbangzhu.png','11','html/kefuzhongxin/shiyongbangzhu.html','0')";
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

	/*$sqlite.execSql({
	 "db" : dbName,
	 "sql" : sql6
	 });
	 */

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

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql11
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql12
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql13
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql14
	});

	$sqlite.execSql({
		"db" : dbName,
		"sql" : sql15
	})
}

function initializeBD() {
	$ctx.setApp({
		"dbName" : dbName
	});

	var tabBoolsql = "SELECT * FROM sqlite_master WHERE type='table' AND name='appTab';"
	var data = $sqlite.query({
		"db" : dbName,
		"sql" : tabBoolsql
	});
	//alert("data:"+data);
	if (JSON.parse(data).length < 1) {
		//alert("初始化数据表");
		initTable();
		initTableData();
	}

}

function loadDataForAppIndex() {
	//alert("加载了...");
	initializeBD();
	var sql = "select distinct  _id,appCode,name,appstate,imgPath,msgNum,srcPath,degrate from appTab where appstate='on'";
	var data = $sqlite.query({
		"db" : dbName,
		"sql" : sql
	});

	//alert("原始数据：" + data);
	json = JSON.parse(data);
	//alert("首页json数据：" + json);
	return json;

}

var self;
function AppModelIndex() {
	self = this;
	this.searchData = function(new_data) {
		self.clear();
		self.appData.removeAll();
		for (var i = 0; i < new_data.length; i++) {
			self.appData.push(new_data[i]);
		};
	};

	this.clear = function() {
		self.appData.removeAll();
	}
};

var appModelIndex = new AppModelIndex();

function search(sdata) {
	clearData();
	appModelIndex.searchData(sdata);
}

function clearData() {
	appModelIndex.clear();
}

var islider2 = '';
summerready = function() {
	/*
	 var params = {
	 "appid" : "769",
	 "ip" : "", //可选
	 "port" : ""//可选
	 }

	 var info = summer.getSysInfo(json);
	 // 注册upush
	 UPush.startUPushSDK(params, null, null);
	 alert("注册成功");
	 // {"aps":{"alert":{"title":"kkk","body":"kkk"},"sound":"default"}}
	 //后台推送
	 if (info.systemType == "ios") {
	 var event = summer.getStorage('receiveNotification');
	 if (event != underfind || null) {
	 $(".um-header a:last-child span").remove();
	 alert(event);
	 return false;
	 } else {
	 //即时推送
	 document.addEventListener("upush.receiveNotification", onReceiveNotification, false);
	 }
	 } else {
	 //即时推送
	 document.addEventListener("upush.receiveNotification", onReceiveNotification, false);
	 }

	 function onReceiveNotification(event) {
	 event = summer.getStorage('receiveNotification');
	 alert(event);
	 var datas = event.aps.alert;
	 var datasLen = datas.length;
	 if (!dataslen) {
	 $(".um-header a:last-child").append("<span class='mess'></span>");
	 var title = datas.title;
	 var content = datas.body;
	 event = '';
	 }
	 }
	 */
	var list = [{
		content : "../../img/index_banner1.png"
	}, {
		content : "../../img/index_banner2.png"
	}, {
		content : "../../img/index_banner3.png"
	}];

	islider2 = new iSlider({
		type : 'pic',
		data : list,
		dom : document.getElementById("iSlider-wrapper"),
		isLooping : true,
		animateType : 'default',
		isAutoplay : true,
		fixPage : false,
		animateTime : 800
	});
	islider2.addDot();
	serviceZCJD();
	var jsonArrayAppData = loadDataForAppIndex();
	self.appData = ko.observableArray(jsonArrayAppData);
	ko.applyBindings(appModelIndex, document.getElementById("applistview"));

}
function ref() {
	var jsonArrayAppData = loadDataForAppIndex();
	search(jsonArrayAppData);
}

function serviceZCJD() {//政策解读---轮播图
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});

	var parms = "{'pt_tableCode':'cs_policy','pe_tolinkimg':'1'}";
	$service.callAction({
		"viewid" : "com.yonyou.hg12360proj.controller.MdmControler", //部署在MA上的Controller的包名
		"action" : "queryByCode", //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successZCJD()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});
}

function successZCJD(result) {
	islider2.destroy();
/*
	var imgArray = [];
	$.each(result.dataInfo, function(i, e) {
		imgArray.push({content:e.img});
	})
	*/

	var imgArray = [{
		content : "../../img/index_banner1.png"
	}, {
		content : "../../img/index_banner2.png"
	}, {
		content : "../../img/index_banner3.png"
	}];

	var islider = new iSlider({
		type : 'pic',
		data : imgArray,
		//data : result.dataInfo,
		dom : document.getElementById("iSlider-wrapper"),
		isLooping : true,
		animateType : 'default',
		isAutoplay : true,
		fixPage : false,
		animateTime : 800
	});
	islider.addDot();

}

