var isClickSearch = '0';
var self;
var viewModel;

//------------------------------------------------search
$("#searchValue").bind('search', function() {
	//alert("search")
	searchDataMess('1')
});

//------------------------------------------------后台调用
function serviceData() {

	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});

	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tab = "CS_SYBZ";
	var column = "pl_title";
	var searchValue = document.getElementById("searchValue").value;
	//alert("tab: " + tab + ",column:" + column + ",searchValue: " + searchValue);
	var parms = null;
	if (searchValue == "" || searchValue == null) {
		parms = "{pt_tableCode:'" + tab + "',po_id:'ASC'}";
	} else {
		parms = "{pt_tableCode:'" + tab + "'," + column + ":'" + searchValue + "',po_id:'ASC'}";
	}

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
	//alert(result.flag);
	if (isClickSearch == "0") {
		self.data = ko.observableArray(result.dataInfo);
		getContentData(result.dataInfo);
	} else {
		search(result.dataInfo);
	}
	$(".um-content").removeClass('none');
}

function searchDataMess(isClick) {
	isClickSearch = isClick;
	serviceData();
}

//------------------------------------------------后台调用
summerready = function() {
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
		function ViewModel() {
			self = this;
			searchDataMess('0');
			//默认首次查询所有
			this.searchData = function(new_data) {
				self.clear();
				self.data.removeAll();
				for (var i = new_data.length - 1; i >= 0; i--) {
					self.data.push(new_data[i]);
				};
			};

			this.clear = function() {
				self.data.removeAll();
			}
		};

		viewModel = new ViewModel();
	}

}
function search(sdata) {
	clearData();
	viewModel.searchData(sdata);
};

function clearData() {
	viewModel.clear();
}

function getContentData(datas) {
	ko.applyBindings(viewModel, document.getElementById('listview'));
	var listview = UM.listview("#listview");
	//添加控件方法
	listview.on("itemClick", function(sender, args) {
		var item = viewModel.data()[args.rowIndex];

		var viewT = document.getElementById(item.id);
		if (viewT.style.display != "none") {
			viewT.style.display = "none";
		} else {
			viewT.style.display = "";
		}
	});

	listview.on("pullDown", function(sender) {
		sender.refresh();
	});

	listview.on("pullUp", function(sender) {
		sender.refresh();
		$(".um-content").removeClass("none");
	});

}
