summerready = function(){
	var header = $summer.byId("pageHeader");
    $summer.fixStatusBar(header);
	var mess = summer.pageParam.parmdatas;
	$summer.byId("title").innerText = mess.title;
	$summer.byId("time").innerHTML = "<h5 class='um-common-newh5' id='time'>发布时间："+mess.releasetime+"</h5>";
	$summer.byId("content").innerHTML = mess.content;
}