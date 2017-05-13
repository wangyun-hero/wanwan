//------------------------------------------------后台调用
summerready = function() {
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
	}
	var data = [{
		group : "1",
		content : [{
			val : "001",
			text : "aaa"
		}, {
			val : "002",
			text : "aaaa2"
		}]
	}, {
		group : "2",
		content : [{
			val : "0001",
			text : "aaa"
		}, {
			val : "0002",
			text : "bbb"
		}]
	}]
	successSelect(data);
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
				UM.showLoadingBar({
					text : "正在加载",
					overlay : false,
					icons : 'ti-loading'
				})
				serviceData(Type);
			}

		}
	});

	//运输单类型
	$("#ransportation").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#ransportation_dummy").addClass("form-control").attr("readonly", false);
	//类型
	$("#type").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#type_dummy").addClass("form-control").attr("readonly", false);

}
//------------------------------------------------后台调用

function serviceDataSelect() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});

	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tab = "CS_SYBZ";
	var column = "pl_title";
	var searchValue = document.getElementById("searchValue").value;
	var parms = null;
	if (searchValue == "" || searchValue == null) {
		parms = "{pt_tableCode:'" + tab + "',po_id:'ASC'}";
	} else {
		parms = "{pt_tableCode:'" + tab + "'," + column + ":'" + searchValue + "',po_id:'ASC'}";
	}

	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successSelect()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});

}

function successSelect(data) {
	//加入返回值中的option的值, diplay: block
	var groups = data;
	var groupsLen = groups.length;
	var htmls = "";
	$("#haiguanCode option").remove();
	if (groupsLen > 0) {
		for (var i = 0; i < groupsLen; i++) {
			var items = data[i].content;
			var itemsLen = items.length;
			htmls += '<optgroup label=' + data[i].group + '>'
			for (var j = 0; j < itemsLen; j++) {
				htmls += '<option value=' + items[j].val + '>' + items[j].text + '</option>'
			}
			htmls += '</optgroup>';
		}
	} else {
		alert(datas.msg);
	}
	$("#haiguanCode").append(htmls);
	//海关数据填充
	$("#haiguanCode").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		group : true,
		maxWidth : [40, 260],
		width : [40, 235],
		headerText : function(valueText) {
			return "请选择关区代码";
		},
	});
	$("#haiguanCode_dummy").addClass("form-control").attr("readonly", false);
}

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
			'tempId' : '43', //企业关键信息
			't2.parent_bill_no' : '111120394857'
		};
	} else {
		var parms = {
			'pageNumber' : '1',
			'pageSize' : '5',
			'appId' : '17',
			'tempId' : '43', //企业关键信息
			't2.parent_bill_no' : '', //总提运单号
			't2.bill_no' : '111120394857'//提运单号
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
	var dataText = doT.template($("#haikongInfo").text());
	//加载数据
	$(".um-card").append(dataText(result.dataInfo));
}

