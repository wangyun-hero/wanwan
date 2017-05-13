//------------------------------------------------后台调用
summerready = function() {
	/*
	 var data = {
	 dataInfo : [{
	 "customs_code" : "2100",
	 "chk_mark" : "1",
	 "rel_mark" : "1",
	 "bill_no" : "232342312112",
	 "transport_date_mark" : "1",
	 "i_e_date" : 1297347011000,
	 "tal_mark" : "1",
	 "i_e_flag" : "I",
	 "rtx_mark" : "1",
	 "bill_rel_mark" : "1",
	 "manifest_id" : "12313213212",
	 "arrival_mark" : "1"
	 }]
	 }

	 success(data)
	 */
	var header1 = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header1);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	var header3 = $summer.byId("pageHeader3");
	$summer.fixStatusBar(header3);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		$("#search_btn").click(function() {
			var inputVal = $("#cangdan_search").val();
			var Type = true;
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
					/*loading*/
					UM.showLoadingBar({
						text : "正在加载",
						overlay : false,
						icons : 'ti-loading'
					})
					serviceData(Type);
				}

			}
		});
	}

}
//------------------------------------------------后台调用
function serviceData(type) {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.AssignmentBookController";
	var actionT = "queryAssignmentBook";
	if (type == true) {
		var parms = {
			'pageNumber' : '1',
			'pageSize' : '5',
			'appId' : '17',
			'tempId' : '44',
			't1.manifest_id' : '12313213212'
		};
	} else {
		var parms = {
			'pageNumber' : '1',
			'pageSize' : '5',
			'appId' : '17',
			'tempId' : '44',
			't1.bill_no' : '',
			't1.manifest_id' : '12313213212'
		};
	}

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
	var dataText = doT.template($("#gongluInfo").text());
	//加载数据
	$(".um-card").append(dataText(result.dataInfo));
}

