summerready = function(){
	var header = $summer.byId("pageHeader");
    	$summer.fixStatusBar(header);
	$summer.byId("idV").value = summer.pageParam.id;
	$summer.byId("titleV").innerText = summer.pageParam.title;
	$summer.byId("releaseTimeV").innerText = summer.pageParam.releasetime;
	$summer.byId("contentV").innerHTML = summer.pageParam.content;
	//$summer.byId("attachmentFileUrlV").innerHTML = summer.pageParam.attachmentfileurl;
}