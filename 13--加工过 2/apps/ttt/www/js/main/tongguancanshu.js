summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	//Knockout绑定
	var ViewModel = function() {
	};
	var listdata = [{
		"modelName" : "监管方式代码表",
		"modelCode" : "jianguanfangshi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "进出口货物的海关监管方式",
		"tongguancanshurgb" : "#00B0F0"
	}, {
		"modelName" : "国内地区代码表",
		"modelCode" : "guoneidiqu",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "进出口报关单境内目的地、境内货源地",
		"tongguancanshurgb" : "#9BBB59"
	}, {
		"modelName" : "计量单位代码表",
		"modelCode" : "jiliangdanwei",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#FFC000"
	}, {
		"modelName" : "成交方式代码表",
		"modelCode" : "chengjiaofangshi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#FFC000"
	}, {
		"modelName" : "运输方式代码表",
		"modelCode" : "yunshufangshi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "实际运输方式或海关规定的特殊运输方式",
		"tongguancanshurgb" : "#00B0F0"
	}, {
		"modelName" : "征免性质代码表",
		"modelCode" : "zhengmianxingzhi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "海关对进出口货物实施征、减、免税管理的性质类别 ",
		"tongguancanshurgb" : "#00B0F0"
	}, {
		"modelName" : "关区代码表",
		"modelCode" : "guanqudaima",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "进出口口岸海关名称",
		"tongguancanshurgb" : "#9BBB59"
	}, {
		"modelName" : "企业性质代码表",
		"modelCode" : "qiyexingzhi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#8064A2"
	}, {
		"modelName" : "用途代码表",
		"modelCode" : "yongtudaima",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "进口货物的实际用途",
		"tongguancanshurgb" : "#00B0F0"
	}, {
		"modelName" : "征减免税方式代码表",
		"modelCode" : "zhengjianmianshuifangshi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "进出口货物征、减、免税或特案处理的方式",
		"tongguancanshurgb" : "#00B0F0"
	}, {
		"modelName" : "国别（地区）代码表",
		"modelCode" : "guobiediqu",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#9BBB59"
	}, {
		"modelName" : "货币代码表",
		"modelCode" : "bizhidaima",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#FFC000"
	}, {
		"modelName" : "地区性质代码表",
		"modelCode" : "diquxingzhi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "无",
		"tongguancanshurgb" : "#8064A2"
	}, {
		"modelName" : "结汇方式代码表",
		"modelCode" : "huijiefangshi",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "出口货物收结外汇的方式",
		"tongguancanshurgb" : "#FFC000"
	}, {
		"modelName" : "监管证件代码表",
		"modelCode" : "jianguanzhengjian",
		"linkUrl" : "html/main/tongguancanshu/tongguancanshuDetail.html",
		"img" : "../../../img/tongguancanshu_right.png",
		"descriptions" : "各种进出口许可证件的分类标志",
		"tongguancanshurgb" : "#00B0F0"
	}];

	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(listdata);
	ko.applyBindings(viewModel, document.getElementById("listview"));
	//构造控件实例
	var listview = UM.listview("#listview");
	listview.on('itemClick', function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert('您点击了列表第' + (args.rowIndex + 1) + "行！");
		var item = viewModel.data()[args.rowIndex];
		openTongGuanView(item.modelName, item.modelCode, item.linkUrl, item.descriptions);
	});
}
function openTongGuanView(modelName, modelCode, linkUrl, descriptions) {
	summer.openWin({
		name : modelCode,
		url : linkUrl,
		id : modelCode,
		opaque : true,
		vScrollBarEnabled : false,
		pageParam : {
			modelParmName : modelName,
			modelParmCode : modelCode,
			remark : descriptions
		}
	});
}
