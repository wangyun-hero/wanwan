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
	$("#search_btn").click(function() {
		serviceData();	
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})	
	});

	$(".um-input-clear").click(function() {
		$(this).prev("input").val("");
	});
	

	//起始时间
	$('#datetimeDate-begin').mobiscroll().date({
		theme : "ios",
		lang : "zh",
		display : "bottom",
		min : new Date(2014, 8, 15),
		max : new Date(2024, 8, 14)
	});
	$('#datetimeDate-end').mobiscroll().date({
		theme : "ios",
		lang : "zh",
		display : "bottom",
		min : new Date(2014, 8, 15),
		max : new Date(2024, 8, 14)
	});

	//类型
	$("#type").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	/*动态请求海关列表*/
	$('#haiguan').mobiscroll().select({
		theme : 'ios',
		lang : 'zh',
		display : 'bottom',
		cancelText : null,
		headerText : function(valueText) {
			return "请选择海关";
		},
		data : [{
			text : '全国海关',
			value : '0000'
		}]
	});
	$("#type_dummy").addClass("form-control").attr("readonly", false);
	$("#haiguan_dummy").addClass("form-control").attr("readonly", false);

	//绑定数据
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
		'tempId' : '40',//企业关键信息
		't1.LATEST_TRADE_CO':'2341910439',
		't1.CUSTOMS_CODE':'3211'
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
	var dataText = doT.template($("#qiyeInfo").text());
	//加载数据
	$("#qiyeInfoCon").append(dataText(result.dataInfo));
}