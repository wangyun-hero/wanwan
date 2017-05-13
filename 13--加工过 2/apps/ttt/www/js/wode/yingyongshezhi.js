summerready = function() {
	//改变状态栏的颜色
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
	}
	//页面跳转
	var URL = "";
	$("#yingyongSetting a").click(function() {
		var item = $(this).data("id");
		if (item == "qingchuhuancun") {
			clearData();
			UM.toast({
				text : "清除缓存成功",
				duration : 3000
			})

			return false;

		} else if (item == "yijianfankui") {
			URL = "html/wode/yingyongshezhi/yijianfankui.html";
			ID = "yijianfankui";
		} else if (item == "guanyu") {
			URL = "html/wode/yingyongshezhi/guanyu.html";
			ID = "guanyu"
		} else if (item == "tuichudenglu") {
			summer.setStorage("USER_ACCOUNT", "");
			summer.execScript({
				"winId" : "root",
				"frameId" : "wode",
				"script" : "showWode()"
			});
			summer.closeWin();
			return false;
		}
		summer.openWin({
			"url" : URL,
			"id" : ID
		});
	});

}