summerready = function() {

	showWode();

};

//构造控件实例
var jsonArray = [{
	"title" : "我的资料",
	"img" : "../../img/wodeziliao.png",
	"cont" : "",
	"name" : "wodeziliao",
	"url" : "html/wode/wodeziliao.html"
}, {
	"title" : "首页快捷",
	"img" : "../../img/shouyekuaijie.png",
	"cont" : "自定义首页常用操作",
	"name" : "shouyekuaijie",
	"url" : "html/main/appEdit/appOperations.html"
}, {
	"title" : "我的收藏",
	"img" : "../../img/wodeshoucang.png",
	"cont" : "收藏的文策、公告等",
	"name" : "wodeshoucang",
	"url" : "html/main/xiaoxi/developping.html"
}, {
	"title" : "我的订阅",
	"img" : "../../img/wodedingyue.png",
	"cont" : "订阅并跟踪单证状态",
	"name" : "wodedingyue",
	"url" : "html/main/xiaoxi/developping.html"
}, {
	"title" : "我的设置",
	"img" : "../../img/yingyongshezhi.png",
	"cont" : "",
	"name" : "yingyongshezhi",
	"url" : "html/wode/yingyongshezhi.html"
}]
var jsonArray1 = [{
	"title" : "我的资料",
	"img" : "../../img/wodeziliao.png",
	"cont" : "",
	"name" : "login",
	"url" : "html/wode/login.html"
}, {
	"title" : "首页快捷",
	"img" : "../../img/shouyekuaijie.png",
	"cont" : "自定义首页常用操作",
	"name" : "shouyekuaijie",
	"url" : "html/main/appEdit/appOperations.html"
}, {
	"title" : "我的收藏",
	"img" : "../../img/wodeshoucang.png",
	"cont" : "收藏的文策、公告等",
	"name" : "wodeshoucang",
	"url" : "html/main/xiaoxi/developping.html"
}, {
	"title" : "我的订阅",
	"img" : "../../img/wodedingyue.png",
	"cont" : "订阅并跟踪单证状态",
	"name" : "wodedingyue",
	"url" : "html/main/xiaoxi/developping.html"
}, {
	"title" : "我的设置",

	"img" : "../../img/yingyongshezhi.png",
	"cont" : "",
	"name" : "yingyongshezhi",
	"url" : "html/wode/yingyongshezhi.html"
}]
function showWode() {
	var users = summer.getStorage("USER_ACCOUNT");
	var listview = UM.listview("#listview");
	if (users == null || users == "") {
		success(jsonArray1);
		$("#goLogin").click(function() {
			openNewView('login', 'html/wode/login.html')
		})
	} else {
		$("#usernameMess").text(users + ",欢迎您！");
		$("#userdegree").text('个人用户');
		success(jsonArray);
	}
	//添加控件方法
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert("您点击了列表第" + (args.rowIndex + 1) + "行！");
		var id = args.$target.data("name");
		var url = args.$target.data("url");
		summer.openWin({
			"id" : id,
			"url" : url
		});
	});
}

function success(data) {
	var dataText = doT.template($("#wode").text());
	//加载数据
	$("#listview ul").html("");
	$("#listview ul").append(dataText(data));
}
