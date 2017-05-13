var zixunId;
var ViewModel = function() {
};
var viewModel = new ViewModel();
summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
		var datas = summer.pageParam.parmdatas;
		var zxId = datas.id;
		console.log(typeof(zxId));
		var zxTime = datas.time;
		var content = datas.content;
		$("#contentV").text(content)
		$("#releasetimeV").text("发布时间：" + zxTime);
		serviceData(zxId);
	}
}
function serviceData(id) {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryById";
	var tab = "CS_consultation";
	var parms = "{'pt_tableCode':'" + tab + "','pe_id':" + id + "}";
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
	UM.hideLoadingBar();
	if (flag == "success") {		
		var infoLen = result.dataInfo.length;
		if (infoLen > 0) {
			var dataText = doT.template($("#dataTemp").text());
			$("#listview um-row").append(dataText(result.dataInfo))
		} else {
			$("#empty").removeClass("none");
		}
	} else {
		console.log(flag.errMsg);
	}
}
