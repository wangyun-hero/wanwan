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
	/*导航更换js*/
	$('ul.um-tabbar-switch  Li').click(function() {
		$(this).addClass('active').siblings('.active').removeClass('active');
		var tar = $(this).attr('data-tar');
		$(tar).addClass('active').siblings('.active').removeClass('active');
	});

	$("#search_btn").click(function() {
		toPage('#page2');
	});

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
$(function() {/*
	 var data = [{
	 "company" : "用友有限公司"

	 }, {
	 "company" : "用友有限公司"
	 }, {
	 "company" : "用友有限公司"
	 }, {
	 "company" : "用友有限公司"
	 }];
	 var ViewModel = function() {
	 //	showInfo:function(){
	 //			this.removeClass("none");
	 //	}
	 };
	 var viewModel = new ViewModel();
	 viewModel.data = ko.observableArray(data);
	 ko.applyBindings(viewModel);
	 var ViewModel2 = function() {
	 //	showInfo:function(){
	 //			this.removeClass("none");
	 //	}
	 };
	 var data = [{
	 "status" : "结关",
	 "info" : "审批通过",
	 "time" : "2016/1/13 12:10:00"
	 }, {
	 "status" : "放行",
	 "info" : "审批通过",
	 "time" : "2016/1/13 12:10:00"
	 }, {
	 "status" : "挂起",
	 "info" : "审批通过",
	 "time" : "2016/1/13 12:10:00"
	 }, {
	 "status" : "入库",
	 "info" : "审批通过",
	 "time" : "2016/1/13 12:10:00"
	 }];
	 var ViewModel2 = function() {

	 };
	 var viewModel2 = new ViewModel2();
	 viewModel2.data = ko.observableArray(data);
	 ko.applyBindings(viewModel2);
	 */

});
