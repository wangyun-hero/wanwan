var pageSize = 2;
var currPage = 1;
//分页标示：no为不分页；yes为分页
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
		serviceData();
		bindlistview()
	}
}
//上拉下拉绑定事件
function bindlistview() {
	var listview = UM.listview("#listview");
	//上拉加载
	listview.on("pullUp", function(sender) {
		serviceData();
	});
}

//------------------------------------------------后台调用
function serviceData() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tab = "CS_policy";
	var pageParam = ",'pg_limitNum':'" + pageSize + "','pg_pageNo':'" + currPage + "'";
	var parms = "{'pt_tableCode':'" + tab + "','po_changetime':'DESC'" + pageParam + "}";
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
	var totalNum = result.totalPageNum;
	currPage += currPage;
	if (totalNum > 0) {
		//把获取到的数据写到页面中
		dataRendering(result.dataInfo);
	} else {
		$("#empty").removeClass("none");
	}
}

//数据渲染
function dataRendering(data) {
	var dataText = doT.template($("#dataTemp").text());
	//加载数据
	$("#listview ul").append(dataText(data));

}

function openView(linkurl) {
	if (linkurl != null && linkurl != "") {
		summer.openWin({
			id : "weixinView",
			name : "weixinView",
			url : "html/main/weixin/weixin.html",
			opaque : true,
			pageParam : {
				modelParmName : linkurl
			},
			vScrollBarEnabled : false
		}, null, null);

		summer.setStorage("weixinUrl", linkurl);
	} else {
		summer.closeWin();
	}
}

//------------------------------------------------后台调用

