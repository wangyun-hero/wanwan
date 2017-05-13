$(function() {
	//构造控件实例
	var listview = UM.listview("#listview");
	//Knockout绑定
	var ViewModel = function() {
	};
	var jsonArray = [{
		"title" : "系统消息",
		"img" : "../../../img/index_redianwenti.png",
		"msgNum" : 1,
		"content" : "系统版本消息、新功能上线通知",
		"linkurl" : "15:24"
	}, {
		"title" : "订阅通知",
		"img" : "../../../img/index_redianwenti.png",
		"msgNum" : 4,
		"content" : "最新的公告、署令、相关部委公告通知",
		"linkurl" : "12:40"
	}];
	
	var sums = 0;
	if(jsonArray!=null && jsonArray.length>0){
	  for(var i = 0; i<jsonArray.length; i++){
	     sums = sums + parseInt(jsonArray[i].msgNum);
	  }
	}
	alert("消息总数："+sums);
	if(sums>0){
		
	}
	
	
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		alert("您点击了列表第" + (args.rowIndex + 1) + "行！");
	});
	listview.on("itemDelete", function(sender, args) {
		//这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		var item = viewModel.data()[args.rowIndex];
		alert("您点击了删除按钮!这一行的数据是" + JSON.stringify(item));
		/* args.$target.slideUp(500, function() {
		 viewModel.data.remove(item);
		 }); */
	});
	listview.on("itemSwipeLeft", function(sender, args) {
		//这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		/*sender.showItemMenu(args.$target);*/

	});
	listview.on("tapHold", function() {
		//这里可以处理长按事件
		/*console.log("您长按了列表！");*/
	});
}); 