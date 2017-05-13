function serviceZCJD() {//政策解读---轮播图
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});

	var parms = "{'pt_tableCode':'cs_policy1','pe_tolinkimg':'1'}";
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
	var islider = new iSlider({
		type : 'pic',
		data : result.dataInfo,
		dom : document.getElementById("iSlider-wrapper"),
		isLooping : true,
		animateType : 'default',
		isAutoplay : true,
		fixPage : false,
		animateTime : 800
	});
	islider.addDot();
}

function serviceMessage() {//顶部消息显示
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
	alert("totalPageNum:" + result.totalPageNum);
}

