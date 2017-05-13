var arrData = [{
	itemCode : "1",
	title : "公告"
}, {
	itemCode : "2",
	title : "署令"
}, {
	itemCode : "3",
	title : "相关部委公告"
}];
var pageSize = 20;
//分页的每页数目
var currPage = 1;
//开始页
var startNum = 1;
//分页起始条目
var itemFlag = "1";
//选项卡选择
var repeatClick = "1";

//分类
var isClickSearch = '0';
//查询分类：0为默认查询全部；1为带搜索框条件查询
var isPageData = "no";

//分页标示：no为不分页；yes为分页
//---------------------------------------------------------选项卡
function Model() {
}

var Model = new Model();
Model.arrData = ko.observableArray(arrData);
ko.applyBindings(Model, document.getElementById("itemSwitch"));

$("#itemSwitch li").click(function() {
	$(this).addClass("gxxaddClass").siblings().removeClass("gxxaddClass");
	var _index = $("#itemSwitch li.gxxaddClass").index() + 1;
	itemFlag = _index;
	if (_index != repeatClick) {
		//clearData();
		document.getElementById("searchValue").value = "";
		currPage = 1;
		isPageData = "no";
		searchDataMess("0");
	}
	repeatClick = _index;
});
//---------------------------------------------------------选项卡

$("#searchValue").bind('search', function() {
	//alert("search111")
	currPage = 1;
	isPageData = "no";
	searchDataMess("1");
	//isClickSearch
});

//---------search
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
	//alert("search");
	clearData();
	viewModel.searchData(sdata);
}

function loadPageMAData(sdata) {
	viewModel.pageMAData(sdata);
}

function clearData() {
	viewModel.clear();
}

//------------------------------------------------后台调用
summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		$("#page1").removeClass("none");
		noNet(arrys.jsPath);
		$(".notFound").removeClass("none");
		return false;
	} else {
		$(".notFound").addClass("none");
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
		$("#itemSwitch li:eq(0)").addClass("gxxaddClass");
		searchDataMess('0');
	}

	var listview = UM.listview("#listview");
	//构造控件实例

	//添加控件方法
	listview.on("itemClick", function(sender, args) {
		//这里可以处理行点击事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
		//alert("您点击了列表第" + (args.rowIndex + 1) + "行！");
		var item = viewModel.data()[args.rowIndex];
		summer.openWin({
			"id" : "zhengcefaguiDetail",
			"url" : "html/main/zhengcefagui/zhengcefaguiDetail.html",
			"pageParam" : {
				"parmdatas" : item,
				"status" : 1
			}
		});

	});

	listview.on("pullDown", function(sender) {
		sender.refresh();
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

var typeFlag = "";

function searchDataMess(isClick) {
	isClickSearch = isClick;
	//alert(itemFlag)
	if (itemFlag == '3') {
		//$(".um-common-a").eq(2).addClass("addClass");
		typeFlag = "bw";
		setTimeout("serviceData('CS_notice', 'pl_title')", 500);

	} else if (itemFlag == '2') {
		//$(".um-common-a").eq(1).addClass("addClass");
		typeFlag = "pt";
		setTimeout("serviceData('CS_officeorder', 'pl_title')", 500);
		//alert(isClickSearch);
	} else {
		//$(".um-common-a").eq(0).addClass("addClass");
		typeFlag = "pt";
		setTimeout("serviceData('CS_notice', 'pl_title')", 500);
	}

}

function serviceData(tab, column) {
	$ctx.setApp({
		"applicationid" : "hotline12360"
	});
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值

	});
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var searchValue = document.getElementById("searchValue").value;
	var pageParam = ",'pg_limitNum':'" + pageSize + "','pg_pageNo':'" + currPage + "'";

	var parms = null;

	if (searchValue == "" || searchValue == null) {
		parms = "{'pt_tableCode':'" + tab + "','pe_enumeration_code_type':'" + typeFlag + "','po_releasetime':'DESC'" + pageParam + "}";
	} else {
		parms = "{'pt_tableCode':'" + tab + "','pe_enumeration_code_type':'" + typeFlag + "','" + column + "':'" + searchValue + "','pl_content':'" + searchValue + "', 'relation_pl':'OR', 'po_releasetime':'DESC'" + pageParam + "}";
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
	$("#page1").removeClass("none");
	//alert("flag: " + result.flag + ",dataInfo" + result.dataInfo);
	document.getElementById("totalPageNum").value = result.totalPageNum;

	if (result.dataInfo != "" && result.dataInfo != null) {

		$summer.byId("lastBottom").innerText = "中华人民中和国海关总署";
		document.getElementById("lastBottom").style.display = "none";

		if (isClickSearch == "0") {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				//alert("self.data:"+self.data);
				if (self.data == null) {
					self.data = ko.observableArray(result.dataInfo);
					ko.applyBindings(viewModel, document.getElementById('listview'));
				} else {
					search(result.dataInfo);
				}

			}

		} else {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				search(result.dataInfo);
			}
		}

	} else {//当返回数据为空时，提示：暂无数据
		search(result.dataInfo);
		$summer.byId("lastBottom").innerText = "暂无数据...";
		document.getElementById("lastBottom").style.display = "inline-block";
	}
	// 数据加载完成后，页面呈现数据
	var divs = document.getElementById("listview");
	divs.style.display = "inline-block";

}

//------------------------------------------------后台调用

