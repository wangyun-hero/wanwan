summerready = function() {
	/*
	 var data = {
	 dataInfo : [{
	 "TRADE_NAME" : "中国水电建设集团国际工程有限公",
	 "ENTRY_ID" : "010120130513017558",
	 "OWNER_CODE" : "1104919039",
	 "OWNER_NAME" : "中国水电建设集团国际工程有限公",
	 "AGENT_NAME" : "北京维翔鹏飞国际货运代理有限公",
	 "OP_TYPE" : "101",
	 "TRADE_CO" : "1104919039",
	 "D_DATE" : "2013-04-27",
	 "AGENT_CODE" : "1105980169"
	 }]
	 }
	 success(data);
	 */
	var header1 = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header1);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	var header3 = $summer.byId("pageHeader3");
	$summer.fixStatusBar(header3);

	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");

	}
	$("#search_btn").click(function() {
		var inputVal = $("#baoguan_search").val();
		if (inputVal == '' || !isNum(inputVal)) {
			UM.toast({
				text : '请填写正确信息',
				duration : 3000
			})
			return;
		} else {
			if (inputVal == '404') {
				toPage('#page3');
			} else {
				UM.showLoadingBar({
					text : "正在加载",
					overlay : false,
					icons : 'ti-loading'
				})
				 serviceData()
			}
		}

	});

}
function serviceData() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.AssignmentBookController";
	var actionT = "queryAssignmentBook";
	var parms = {
		'pageNumber' : '1',
		'pageSize' : '5',
		'appId' : '17',
		'tempId' : '42', //修撤单
		't1.ENTRY_ID' : '010120130513017558',
		't1.TRADE_CO' : '1104919039'
	};
	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});

}

function success(result) {
	UM.hideLoadingBar();
	toPage('#page2');
	var dataText = doT.template($("#xiuchedan").text());
	//加载数据
	$("#xiuchedanCon").append(dataText(result.dataInfo));

}

function ToggleShow(obj) {
	var isHas = $(obj).next("p").hasClass("none");
	$(obj).next("p").toggleClass("none");
	if (isHas) {
		$(obj).find("i").text('-');
	} else {
		$(obj).find("i").text('+');
	}
}