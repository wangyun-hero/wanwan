/*全局变量*/
var mycars;
var str1 = "";
var str2 = "";
var str3 = "";
var str4 = "";
var listContent = null;
var parmModelVal = "";
//var noResult = "<span style='font-size:10px;color:red;margin-top: 30px;margin-left: 50px;'>暂无数据</span>";

var isClickSearch = '0';
//查询分类：0为默认查询全部；1为带搜索框条件查询
var isPageData = "no";
//分页标示：no为不分页；yes为分页
var pageSize = 20;
//分页的每页数目
var currPage = 1;
//开始页
var startNum = 1;
//分页起始条目
var self;
var isFirstScan = "yes";

$("#searchValue").bind('search', function() {
	currPage = 1;
	isPageData = "no";
	isFirstScan = "no"
	searchDataMess('no', '1')
});

function ViewModel() {
	self = this;
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
		//self.data.removeAll();
	}
};

var viewModel = new ViewModel();

function search(sdata) {
	viewModel.clear();
	viewModel.searchData(sdata);
}

function loadPageMAData(sdata) {
	viewModel.pageMAData(sdata);
}

function searchDataMess(isF, isClick) {
	isFirstScan = isF;
	isClickSearch = isClick;
	getParmDataList();
}

function getContentData() {
	var listview = UM.listview("#listview");
	//构造控件实例
	listview.on("pullUp", function(sender) {
		isPageData = "yes";
		currPage = parseInt(currPage) + 1;
		//startNum = (currPage - 1) * pageSize + 1;
		var totalPageNum = document.getElementById("totalPageNum").value;
		if (currPage <= parseInt(totalPageNum)) {
			searchDataMess("no", isClickSearch);
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

		var modelParmName = summer.pageParam.modelParmName;
		var modelParmCode = summer.pageParam.modelParmCode;
		var remark = summer.pageParam.remark;
		document.getElementById("modelParmName").value = modelParmName;
		document.getElementById("modelParmCode").value = modelParmCode;
		$summer.byId("viewTitle").innerText = modelParmName;
		searchDataMess('yes', '0');
		$("#searchValue").attr("placeholder", remark);

	}

}
function innerHTMLT() {
	if (mycars.length > 0) {
		str1 = "<span data-bind='text:" + mycars[0] + "'></span>";
	}
	if (mycars.length > 1) {
		str2 = "<span data-bind='text:" + mycars[1] + "'></span>";
	}
	if (mycars.length > 2) {
		str3 = "<span data-bind='text:" + mycars[2] + "' class='um-gray'></span>";
	}
	if (mycars.length > 3) {
		str4 = "<span data-bind='text:" + mycars[3] + "' class='um-gray'></span>";
	}
	var strOuterHTML = "";
	if (mycars.length > 0) {
		strOuterHTML = "<ul class='um-list um-list-static' data-bind='foreach:data'><li class='um-listview-row um-list-con'><div class='clearfix f14'>" + "<div class='um-xs-4 tl um-text-overflow'>" + str1 + "</div>" + "<div class='um-xs-8 tr um-black'>" + str2 + "</div>" + "</div>" + "<div class='clearfix f12'>" + "<div class='um-xs-8 tl'>" + str3 + "</div>" + "<div class='um-xs-4 tr um-text-overflow'>" + str4 + "</div>" + "</div>" + "</li></ul><span id='lastBottom' style='text-align: center;display:none;width: 100%;color:#7F7F7F;font-size:12px'>数据已经加载完了...</span> ";

	}
	return strOuterHTML;
}

function getParmDataList() {
	parmModelVal = document.getElementById("modelParmCode").value;
	var searchValue = document.getElementById("searchValue").value;
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "queryByCode";
	var tableName = "";
	var fieldCode = "";
	if (parmModelVal == "jianguanfangshi") {
		mycars = new Array("supv_modecd", "supv_mode_abbr", "supv_mode_nm");
		tableName = "cs_supv_mode_cd_view";
		// 监管方式代码
		fieldCode = ",'pl_supv_modecd':'" + searchValue + "','pl_supv_mode_abbr':'" + searchValue + "','pl_supv_mode_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "zhengmianxingzhi") {
		// 征免性质代码 zhengmianxingzhi
		mycars = new Array("redu_natrcd", "redu_nature_abbr", "redu_nature_nm");
		tableName = "cs_redu_nature_cd_view";
		fieldCode = ",'pl_redu_natrcd':'" + searchValue + "','pl_redu_nature_abbr':'" + searchValue + "','pl_redu_nature_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "guoneidiqu") {
		// 国内地区代码','guoneidiqu
		mycars = new Array("doms_dstcd", "doms_dstr_nm", "doms_dstr_abbr", "doms_dstr_natrcd");
		tableName = "cs_doms_dstr_cd_view";
		fieldCode = ",'pl_doms_dstcd':'" + searchValue + "','pl_doms_dstr_nm':'" + searchValue + "','pl_doms_dstr_abbr':'" + searchValue + "','pl_doms_dstr_natrcd':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "guobiediqu") {
		// '国别（地区）代码','guobiediqu'
		mycars = new Array("natcd", "inter_std_en_abbr", "nation_en_nm", "nation_cn_nm", "nation_abbr", "chktst_markcd", "txrat_pref_or_comn_markcd", "ship_tdty_pref_or_comn_markcd");
		tableName = "cs_nation_cd_view";
		fieldCode = ",'pl_natcd':'" + searchValue + "','pl_inter_std_en_abbr':'" + searchValue + "','pl_nation_en_nm':'" + searchValue + "','pl_nation_cn_nm':'" + searchValue + "','pl_nation_abbr':'" + searchValue + "','pl_chktst_markcd':'" + searchValue + "','pl_txrat_pref_or_comn_markcd':'" + searchValue + "','pl_ship_tdty_pref_or_comn_markcd':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "jiliangdanwei") {
		// '计量单位代码','jiliangdanwei'
		mycars = new Array("unitcd", "unit_nm", "crspd_stat_unitcd", "cnvt_rate");
		tableName = "cs_unit_cd_view";
		fieldCode = ",'pl_unitcd':'" + searchValue + "','pl_unit_nm':'" + searchValue + "','pl_crspd_stat_unitcd':'" + searchValue + "','pl_cnvt_rate':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "guanqudaima") {
		// '关区代码','guanqudaima'
		mycars = new Array("cus_cd", "cus_nm", "cus_abbr", "cus_tel1", "cus_tel2", "cus_tel3", "cus_tel4", "cus_tel5");
		tableName = "cs_cus_cd_view";
		fieldCode = ",'pl_cus_cd':'" + searchValue + "','pl_cus_nm':'" + searchValue + "','pl_cus_abbr':'" + searchValue + "','pl_cus_tel1':'" + searchValue + "','pl_cus_tel2':'" + searchValue + "','pl_cus_tel3':'" + searchValue + "','pl_cus_tel4':'" + searchValue + "','pl_cus_tel5':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "bizhidaima") {
		// '币值代码','bizhidaima'
		mycars = new Array("currcd", "inter_currcd", "curr_en_nm", "curr_cn_nm");
		tableName = "cs_curr_cd_view";
		fieldCode = ",'pl_currcd':'" + searchValue + "','pl_inter_currcd':'" + searchValue + "','pl_curr_en_nm':'" + searchValue + "','pl_curr_cn_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "yongtudaima") {
		// '用途代码','yongtudaima'
		mycars = new Array("code", "name");
		tableName = "cs_usecode_cd_view";
		fieldCode = ",'pl_code':'" + searchValue + "','pl_name':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "qiyexingzhi") {
		// '企业性质代码','qiyexingzhi'
		mycars = new Array("etps_natrcd", "etps_nature_abbr");
		tableName = "cs_etps_nature_cd_view";
		fieldCode = ",'pl_etps_natrcd':'" + searchValue + "','pl_etps_nature_abbr':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "chengjiaofangshi") {
		// '成交方式代码','chengjiaofangshi'
		mycars = new Array("deal_modecd", "deal_mode_nm");
		tableName = "cs_deal_mode_cd_view";
		fieldCode = ",'pl_deal_modecd':'" + searchValue + "','pl_deal_mode_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "diquxingzhi") {
		// '地区性质代码','diquxingzhi'
		mycars = new Array("dstr_natrcd", "dstr_nature_nm");
		tableName = "cs_dstr_nature_cd_view";
		fieldCode = ",'pl_dstr_natrcd':'" + searchValue + "','pl_dstr_nature_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "huijiefangshi") {
		// '结汇方式代码','huijiefangshi'
		mycars = new Array("code", "name");
		tableName = "cs_jgfs_cd_view";
		fieldCode = ",'pl_code':'" + searchValue + "','pl_name':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "yunshufangshi") {
		// '运输方式代码','yunshufangshi'
		mycars = new Array("trsp_modecd", "trsp_mode_nm");
		tableName = "cs_trsp_mode_cd_view";
		fieldCode = ",'pl_trsp_modecd':'" + searchValue + "','pl_trsp_mode_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "zhengjianmianshuifangshi") {
		// '征减免税方式代码','zhengjianmianshuifangshi'
		mycars = new Array("lvyrlf_modecd", "lvyrlf_mode_nm");
		tableName = "cs_lvyrlf_tax_mode_cd_view";
		fieldCode = ",'pl_lvyrlf_modecd':'" + searchValue + "','pl_lvyrlf_mode_nm':'" + searchValue + "', 'relation_pl':'OR'";
	} else if (parmModelVal == "jianguanzhengjian") {
		// '监管证件代码','jianguanzhengjian'
		mycars = new Array("code", "name");
		tableName = "cs_jgzj_cd_view";
		fieldCode = ",'pl_code':'" + searchValue + "','pl_name':'" + searchValue + "', 'relation_pl':'OR'";
	}

	var pageParam = ",'pg_limitNum':'" + pageSize + "','pg_pageNo':'" + currPage + "'";
	var parms = null;
	if (searchValue == "" || searchValue == null) {
		parms = "{'pt_tableCode':'" + tableName + "'" + pageParam + "}";
	} else {
		parms = "{'pt_tableCode':'" + tableName + "'" + fieldCode + pageParam + "}";
	}
	//alert("parms: " + parms);
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	});
	$ctx.setApp({"applicationid":"hotline12360"});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", // 请求成功后回调js方法
		"error" : "failed()"// 请求失败回调的js方法
	});
}

function success(result) {
	UM.hideLoadingBar();
	$("#page1").removeClass("none");
	$(".notFound").remove();

	document.getElementById("totalPageNum").value = result.totalPageNum;
	if (result.dataInfo != "" && result.dataInfo != null) {
		//alert("isFirstScan:"+isFirstScan);
		if (isFirstScan == "yes") {//只有第一次时生成listview
			$summer.byId("listview").innerHTML = innerHTMLT();
		}
		if (isClickSearch == "0") {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				self.data = ko.observableArray(result.dataInfo);
				ko.applyBindings(viewModel, document.getElementById('listview'));
				getContentData();
			}

		} else {
			if (isPageData == "yes") {
				loadPageMAData(result.dataInfo);
			} else {
				search(result.dataInfo);
			}
		}
		$summer.byId("lastBottom").innerText = "中华人民共和国海关总署";
		document.getElementById("lastBottom").style.display = "none";

	} else {
		//$summer.byId("listview").innerHTML = noResult;
		search(result.dataInfo);
		$summer.byId("lastBottom").innerText = "暂无数据...";
		document.getElementById("lastBottom").style.display = "inline-block";
		$("#lastBottom").css("margin-top", "20px");
	}
	// 数据加载完成后，页面呈现数据
	var divs = document.getElementById("listview");
	divs.style.display = "inline-block";

}
