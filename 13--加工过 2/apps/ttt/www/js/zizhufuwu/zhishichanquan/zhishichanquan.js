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
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
			UM.hideLoadingBar();

	}
}
$(function() {
	$("#search_btn").click(function() {
		var inputVal1 = $("#qunliren_search").val();
		var inputVal2 = $("#qunlimingcheng_search").val();
		var inputVal3 = $("#qunlihao_search").val();
		var typeVal = $("#type").val();
		if ((inputVal1 == '' && inputVal2 == '' && inputVal3 == '') || !isNum(inputVal1) || !isNum(inputVal2) || !isNum(inputVal3)) {
			UM.toast({
				text : '请填写正确信息',
				duration : 3000
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
	var data = [{
		"status" : "100000",
		"info" : "qqqq",
		"time" : "2010-10-22"
	}, {
		"status" : "100000",
		"info" : "qqqq",
		"time" : "2010-10-22"
	}];
	var ViewModel = function() {

	};
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(data);
	ko.applyBindings(viewModel, document.getElementById('listview'));

})
