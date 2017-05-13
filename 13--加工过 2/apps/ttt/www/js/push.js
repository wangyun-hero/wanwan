summerready = function() {
	var params = {
		"appid" : "769",
		"ip" : "", //可选
		"port" : ""//可选
	}
	var info = summer.getSysInfo();
	if (info.systemType == "android") {
	} else if (info.systemType == "ios") {
	alert("33");
		// 注册upush
		UPush.startUPushSDK(params, null, null);
		// {"aps":{"alert":{"title":"kkk","body":"kkk"},"sound":"default"}}
		//后台推送
		var event = summer.getStorage('receiveNotification');
		if (event != underfind || null) {
			$(".um-header a:last-child span").remove();
			alert(event);
			return false;
		} else {
			//即时推送
			document.addEventListener("upush.receiveNotification", onReceiveNotification, false);
		}
	}

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

function getSenderMess() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});

	var parms = "{'pt_tableCode':'CS_message'}";
	$service.callAction({
		"viewid" : "com.yonyou.hg12360proj.controller.MdmControler", //部署在MA上的Controller的包名
		"action" : "queryByCode", //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successMessage()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});

}

function successMessage(result) {
	summer.openWin({
		"id" : 'redianwentiDetail',
		"url" : 'html/kefuzhongxin/zaixianzixunDetail.html',
		"pageParam" : {
			"parmdatas" : result
		}
	});
}