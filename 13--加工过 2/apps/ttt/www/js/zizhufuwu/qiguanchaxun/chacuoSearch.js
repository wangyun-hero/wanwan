summerready = function() {
	//改变状态栏的颜色
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
	$("#search_btn").click(function() {
		toPage('#page2');
	});

}
function toPage(name) {
	if (name == '#page1') {
		var res = 1;
	} else if (name == '#page2') {
		var res = 0;
	} else {
		var res = 0;
	}
	UM.page.changePage({
		target : name,
		isReverse : res
	});

}

$(function() {
	var data = [{
		"number" : "100000"
	}, {
		"number" : "100020"
	}, {
		"number" : "100030"
	}, {
		"number" : "100050"
	}];
	var ViewModel = function() {

	};
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(data);
	ko.applyBindings(viewModel);

	var data2 = [{
		"status" : "100000",
		"time" : "2010-10-22"
	}, {
		"status" : "100000",
		"time" : "2010-10-22"
	}, {
		"status" : "100000",
		"time" : "2010-10-22"
	}, {
		"status" : "100000",
		"time" : "2010-10-22"
	}];
	var ViewModel2 = function() {

	};
	var viewModel2 = new ViewModel();
	viewModel.data2 = ko.observableArray(data2);
	ko.applyBindings(viewModel2);
});
