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

	}
}

$(function() {
	var applistview = UM.listview('#applistview');
	//---------------------------------------- listview start
	function openSecondView(viewName, viewPath) {
		summer.openWin({
			name : viewName,
			url : viewPath,
			opaque : true,
			vScrollBarEnabled : false
			//,pageParam:{title:'信息发布',type:'1'}
		});	
	}

	//Knockout绑定
	var ViewModel = function() {

	};
	var jsonArray = [{
		"sender" : "政策法规",
		"nameCode" : "xinxifabu",
		"img" : "../../img/index_zhengcefagui.png",
		"linkUrl" : "html/main/zhengcefagui/zhengcefagui.html?itemFlag=1",
		"msgNum" : 0,
		"lastMsg" : "及时发布海关令、海关公告等内容",
		"modelId":""
	}, {
		"sender" : "通关参数",
		"nameCode" : "tongguancanshu",
		"img" : "../../img/index_tongguancanshu.png",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshu.html",
		"msgNum" : 4,
		"lastMsg" : "提供监管方式代码、征免性质代码、国别(地区)代码、币值代码等内容的查询。",
		"modelId":"TongGuanCanShu"
	}, {
		"sender" : "机构电话",
		"nameCode" : "haiguanrexian",
		"img" : "../../img/index_jigoudianhua.png",
		"linkUrl" : "html/main/jigoudianhua/jigoudianhua.html?typeFlag=hotline",
		"msgNum" : 5,
		"lastMsg" : "各直属海关名称、热线电话等内容。",
		"modelId":"JiGouDianHua"
	}];

	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel, document.getElementById("listview"));
});
//---------------------------------------- listview start

