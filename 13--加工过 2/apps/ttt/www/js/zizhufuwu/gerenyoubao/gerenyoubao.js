summerready = function() {
	//改变状态栏的颜色
	var header = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header);

}
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

