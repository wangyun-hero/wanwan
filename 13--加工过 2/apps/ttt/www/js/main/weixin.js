summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	/*loading*/
	UM.showLoadingBar({
		text : "正在加载",
		overlay : false,
		icons : 'ti-loading'
	})

	var url = summer.getStorage("weixinUrl");
	var y = 0;
	var width = 0;
	var height = 0;
	y = $summer.offset($summer.byId('pageHeader')).h;
	width = $summer.offset(document.getElementsByTagName("body")[0]).w;
	height = $summer.offset($summer.byId('weixinContent')).h;
	summer.openFrame({
		id : "weixinF",
		url : url,
		rect : {
			x : 0,
			y : y,
			w : width,
			h : height
		}
	});
	UM.hideLoadingBar();
}