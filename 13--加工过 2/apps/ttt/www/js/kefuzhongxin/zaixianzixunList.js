var pageSize = 10;
var currPage = 1;
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
		//构造控件实例
		var listview = UM.listview('#listview');
		listview.on('pullDown', function(sender) {
			sender.refresh();
		});
		listview.on('pullUp', function(sender) {
			serviceData();
			sender.refresh();
		});

		listview.on('itemClick', function(sender, args) {
			var arryItem = {
				"id" : args.$target.data("id"),
				"time" : args.$target.data("time"),
				"content" : args.$target.data("content")
			};
			summer.openWin({
				"id" : 'redianwentiDetail',
				"url" : 'html/kefuzhongxin/zaixianzixunDetail.html',
				"pageParam" : {
					"parmdatas" : arryItem
				}
			});
		});
	}
}
//------------------------------------------------后台调用
function serviceData() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tab = "CS_consultation";
	var pageParam = ",'pg_limitNum':'" + pageSize + "','pg_pageNo':'" + currPage + "'";
	var parms = "{'pt_tableCode':'" + tab + "','po_id':'DESC'" + pageParam + "}";
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
	if (flag == "success") {
		UM.hideLoadingBar();
		var totalNum = result.totalPageNum;
		currPage += currPage;
		$("#listview").css("display", 'inline-block');
		if (totalNum > 0) {
			var dataText = doT.template($("#dataTemp").text());
			//加载数据
			$("#listview ul").append(dataText(result.dataInfo));
		} else {
			$("#empty").removeClass("none");
		}
	} else {
		console.log(flag.errMsg);
	}

}
