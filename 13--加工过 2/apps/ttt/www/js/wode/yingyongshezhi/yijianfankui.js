summerready = function(){
	//改变状态栏的颜色
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
}

function sendMess(){
	api.closeWin();
}