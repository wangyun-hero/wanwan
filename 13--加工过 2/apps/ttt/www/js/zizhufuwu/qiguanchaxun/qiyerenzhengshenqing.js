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

	$(".um-input-clear").click(function() {
		$(this).prev("input").val("");
	});
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
	/*
	 var inst = $('#demo').mobiscroll('getInst');
	 $.getJSON("/content/json/languages.json", function (data) {
	 inst.settings.data = data;
	 inst.refresh();
	 });
	 */
	$("#type_dummy").addClass("form-control").attr("readonly", false);
	$("#haiguan_dummy").addClass("form-control").attr("readonly", false);

	//绑定数据

}

