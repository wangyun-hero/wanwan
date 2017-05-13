var pageSize = 20;
//分页的每页数目
var currPage = 1;
//开始页
var startNum = 1;
//分页起始条目

var isClickSearch = '0';
//查询分类：0为默认查询全部；1为带搜索框条件查询
var isPageData = "no";
//分页标示：no为不分页；yes为分页
$("#searchValue").bind('search',function(){
		currPage = 1;
		isPageData = "no";
		searchDataMess('1')
});
var self;
function ViewModel() {
	self = this;
	//默认首次查询所有
	this.searchData = function(new_data) {
		self.clear();
		self.data.removeAll();
		for (var i = 0; i < new_data.length; i++) {
			self.data.push(new_data[i]);
		};
	};

	this.pageMAData = function(pageMAData) {
		for (var j = 0; j < pageMAData.length; j++) {
			self.data.push(pageMAData[j]);
		};
	};

	this.clear = function() {
		self.data.removeAll();
	}
};

var viewModel = new ViewModel();

function search(sdata) {
	clearData();
	viewModel.searchData(sdata);
}

function loadPageMAData(sdata) {
	viewModel.pageMAData(sdata);
}

function clearData() {
	viewModel.clear();
}

summerready = function(){
    var header = $summer.byId("pageHeader");
    $summer.fixStatusBar(header);
  /*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
	searchDataMess('0');
	}
	var listview = UM.listview("#listview");
	//构造控件实例

	//添加控件方法
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert("您点击了列表第" + (args.rowIndex + 1) + "行！");
		var items = viewModel.data()[args.rowIndex];
		//alert("id:"+items.id+",title:"+items.title+",content:"+items.content+",releasetime:"+items.releasetime);
		summer.openWin({
	       "id" : 'redianwentiDetail',
	       "url" : 'html/kefuzhongxin/redianwentiDetail.html',
	       "pageParam" : {
	           "id" : items.id,
	           "request" : items.request,
	           "reply" : items.reply
	       } 
	   });
		
	});

	listview.on("pullUp", function(sender) {
		isPageData = "yes";
		currPage = parseInt(currPage) + 1;
		//startNum = (currPage - 1) * pageSize + 1;
		var totalPageNum = document.getElementById("totalPageNum").value;
		if (currPage <= parseInt(totalPageNum)) {
			searchDataMess(isClickSearch);
			//调用后台MA获取分页数据
			sender.refresh();
		} else {
		    currPage = totalPageNum;
			var lastBottom = document.getElementById("lastBottom");
			//调用后台MA获取分页数据
			
			lastBottom.style.display = "inline-block";
			sender.refresh();
		}

	});
}


//------------------------------------------------后台调用

function searchDataMess(isClick) {
	isClickSearch = isClick;
	serviceData();

}

function serviceData() {

	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tab = "cs_zsk";
	var column = "pl_request";
	var searchValue = document.getElementById("searchValue").value;
	//alert("tab: " + tab + ",column:" + column + ",searchValue: " + searchValue);
	var pageParam = ",'pg_limitNum':'" + pageSize + "','pg_pageNo':'" + currPage + "'";
	var parms = null;
	if (searchValue == "" || searchValue == null) {
		parms = "{'pt_tableCode':'" + tab + "','po_id':'DESC'" + pageParam + "}";
	} else {
		parms = "{'pt_tableCode':'" + tab + "','" + column + "':'" + searchValue + "','po_id':'DESC'" + pageParam + "}";
	}
	//alert(parms);
	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});

}

function success(result) {
	UM.hideLoadingBar();
	document.getElementById("totalPageNum").value = result.totalPageNum;
	if (result.dataInfo != "" && result.dataInfo != null) {	
		$summer.byId("lastBottom").innerText="数据加载完了...";
		document.getElementById("lastBottom").style.display = "none";
		
		if (isClickSearch == "0") {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				self.data = ko.observableArray(result.dataInfo);
				ko.applyBindings(viewModel, document.getElementById('listview'));
			}

		} else {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				search(result.dataInfo);
			}
		} 
	}else {
		search(result.dataInfo);
		$summer.byId("lastBottom").innerText="暂无数据...";
		document.getElementById("lastBottom").style.display = "inline-block";
	}
		$(".um-content").removeClass("none");
}

//------------------------------------------------后台调用