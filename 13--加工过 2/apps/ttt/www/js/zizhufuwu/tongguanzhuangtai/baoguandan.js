var isClickSearch = '0';
var self;
var viewModel;

//------------------------------------------------后台调用
summerready = function() {
	var header1 = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header1);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		/*
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
		*/

	}
	$("#search_btn").click(function() {
		var inputVal = $("#baoguan_search").val();
		if (inputVal == '' || !isNum(inputVal)) {
			UM.toast({
				text : '请填写正确信息',
				duration : 2000
			})
			return;
		} else {
			if (inputVal == '404') {
				toPage('#page3');
			} else {
				toPage('#page2');
			}

		}
	});
	$("#dingyue_btn").click(function() {
		$(this).text("已订阅").css("background", '#ccc');
		$(".moreBg").removeClass("none");
		var H = $('#successTip').height();
		$("#successTip").css("margin-top", '-120%');
		$("#dingyue_btn").unbind('click');
	});
	$(".moreBg").click(function() {
		$("#successTip").css("margin-top", 0).delay(300);
		setTimeout(function() {
			$(".moreBg").addClass("none");
		}, 500);
	});
	function close() {
		$("#successTip").css("margin-top", 0).delay(300);
		$(".moreBg").addClass("none");
	}

}
$(function() {
	var data = [{
		"status" : "状态通过",
		"info" : "审核通过",
		"time" : "2010-10-22"
	}, {
		"status" : "人工查验",
		"info" : "qqqq",
		"time" : "2010-10-22"
	}, {
		"status" : "待查验",
		"info" : "qqqq",
		"time" : "2010-10-22"
	}, {
		"status" : "接单交单",
		"info" : "qqqq",
		"time" : "2010-10-22"
	}];

	success(data);

})
//------------------------------------------------后台调用

function serviceData() {
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
		"callback" : "success()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});

}

function success(data) {
	var ViewModel = function() {

	};
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(data);
	ko.applyBindings(viewModel, document.getElementById('listview'));
}

