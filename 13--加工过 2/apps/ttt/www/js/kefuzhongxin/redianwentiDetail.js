summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	$summer.byId("requestV").innerText = summer.pageParam.request;
	$summer.byId("replyV").innerHTML = summer.pageParam.reply;
}