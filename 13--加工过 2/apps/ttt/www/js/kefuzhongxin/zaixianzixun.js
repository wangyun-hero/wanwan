summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		var Data = [{
			"type" : "t1"
		}, {
			"type" : "t2"
		}, {
			"type" : "t3"
		}]
		dataRenderingType(Data);
	}

}
//数据渲染---填充问题类型列表
function dataRenderingType(data) {
	var dataText = doT.template($("#selectType").text());
	//加载数据
	$("#Type").append(dataText(data));
	//类型
	$("#Type").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#Type_dummy").addClass("form-control").attr("readonly", false);

}

function serviceData() {
	var Content = $("#zixunTextAre").val();
	var codeType = $("#Type").val();
	if (Content =="") {
		UM.toast({
			text : '反馈问题不能为空',
			overlay : false,
			duration : 3000
		});
		return false;
	}
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "addConsultation";
	var tab = "CS_consultation";
	var parms = "{'enumeration_code_type'='" + codeType + "',content='" + Content + "',user_id=1}";
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
	var flag = result.flag;
	if (flag == 'success') {
		UM.toast({
			text : '提交成功',
			overlay : false,
			duration : 3000
		});
	} else {
		UM.toast({
			text : result.errMsg,
			overlay : false,
			duration : 3000
		});
		console.log(result.errMsg);
	}

}