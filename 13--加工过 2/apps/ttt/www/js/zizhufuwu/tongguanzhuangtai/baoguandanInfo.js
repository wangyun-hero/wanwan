summerready = function() {
	var header1 = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header1);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	var header3 = $summer.byId("pageHeader3");
	$summer.fixStatusBar(header3); 
	/*
	var Arrays={dataInfo:[{
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-01-01",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}]
	}
		var Arrays2={dataInfo:[{
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-01-01",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}, {
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-01-01",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}, {
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-02-01",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}, {
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-03-01",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}, {
			"I_E_DATE" : "2013-04-24",
			"DECL_PORT" : "0101",
			"AGENT_NAME" : "北京华材航空客货服务有限公司",
			"TRADE_CO" : "4401913358",
			"D_DATE" : "2013-04-24",
			"AGENT_CODE" : "1105980019",
			"ENTRY_TYPE" : "PORT",
			"TRADE_NAME" : "中国南航集团进出口贸易有限公司",
			"CREATE_DATE" : "2017-03-05",
			"ENTRY_ID" : "010120131013070066",
			"I_E_PORT" : "0101",
			"OWNER_NAME" : "BP01中国南方航空股份有限公司"
		}]
	}
	*/

	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
		$("#search_btn").click(function() {
			var inputVal = $("#baoguan_search").val();
			var typeVal = $("#type").val();
			if (typeVal == "B") {
				if (inputVal == '' || !isNum(inputVal)) {
					UM.toast({
						text : '请填写正确信息',
						duration : 3000
					})
					return;
				} else {
					if (inputVal == '404') {
						toPage('#page3');
					} else {
						if (typeVal == "B") {
							$("#DECHead-CX-Entry-Con").removeClass("none")
						} else {
							$("#DECHead-CX-TradeCo-Con").removeClass("none")
						}
						UM.showLoadingBar({
							text : "正在加载",
							overlay : false,
							icons : 'ti-loading'
						})
						DECHead_CX_Entry();
						//DECHead_CX_EntrySuccess(Arrays)

					}
				}

			} else {
				if (inputVal == '' || !isNumChar(inputVal)) {
					UM.toast({
						text : '请填写正确信息',
						duration : 3000
					})
					return;
				} else {
					if (inputVal == '404') {
						toPage('#page3');
					} else {
						if (typeVal == "B") {
							$("#DECHead-CX-Entry-Con").removeClass("none")
						} else {
							$("#DECHead-CX-TradeCo-Con").removeClass("none")
						}
						UM.showLoadingBar({
							text : "正在加载",
							overlay : false,
							icons : 'ti-loading'
						})
						DECHead_CX_TradeCo();
						//DECHead_CX_TradeCoSuccess(Arrays2)

					}
				}
			}

		});

	}

	$("#type").change(function() {
		var typeVal = $("#type").val();
		if (typeVal == "Q") {
			$("#time").removeClass("none");
			$("#baoguan_search").attr("placeholder", '请输入组织机构代码');
		} else {
			$("#time").addClass("none");
			$("#baoguan_search").attr("placeholder", '请输入报关单号');
		}
	});

	//类型
	$("#type").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	//起始时间
	$('#datetimeDate-begin').mobiscroll().date({
		theme : "ios",
		lang : "zh",
		display : "bottom",
		min : new Date(2014, 8, 15),
		max : new Date(2024, 8, 14)
	});
	$('#datetimeDate-end').mobiscroll().date({
		theme : "ios",
		lang : "zh",
		display : "bottom",
		min : new Date(2014, 8, 15),
		max : new Date(2024, 8, 14)
	});
	$("#type_dummy").addClass("form-control");

}
function DECHead_CX_Entry() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.AssignmentBookController";
	var actionT = "queryAssignmentBook";
	var parms = {
		'pageNumber' : '1',
		'pageSize' : '5',
		'appId' : '17',
		'tempId' : '41',
		't1.ENTRY_ID' : '010120131013070066',
		't1.D_DATE' : '2013-04-24 09:13:45'
	};
	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "DECHead_CX_EntrySuccess()", //请求成功后回调js方法
		"error" : "failed()"//请求失败回调的js方法
	});
}

function DECHead_CX_EntrySuccess(result) {
	UM.hideLoadingBar();
	toPage('#page2');
	var dataText = doT.template($("#DECHead-CX-Entry").text());
	//加载数据
	$("#DECHead-CX-Entry-Con").append(dataText(result.dataInfo));

}

function DECHead_CX_TradeCo() {
	$service.writeConfig({
		"host" : ipUrl, //向configure中写入host键值
		"port" : port//向configure中写入port键值
	});
	var viewidT = "com.yonyou.hg12360proj.controller.AssignmentBookController";
	var actionT = "queryAssignmentBook";
	var parms = {
		'pageNumber' : '1',
		'pageSize' : '5',
		'appId' : '17',
		'tempId' : '41',
		't1.D_DATE' : '2013-04-24 09:13:45',
		//'t1.AGENT_CODE': '1105980019',
		't1.TRADE_CO' : '4401913358',
		//'t1.OWNER_CODE':''
	};
	$service.callAction({
		"viewid" : viewidT, //部署在MA上的Controller的包名
		"action" : actionT, //后台Controller的方法名,
		"params" : parms, //自定义参数，json格式
		"autoDataBinding" : false, //请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", //将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : " DECHead_CX_TradeCoSuccess()", //请求成功后回调js方法
		"error" : " DECHead_CX_TradeCo()"//请求失败回调的js方法
	});
}

function DECHead_CX_TradeCoSuccess(result) {
	UM.hideLoadingBar();
	toPage('#page2');
	//把获取到的数据写到页面中
	var dataText = doT.template($("#DECHead-CX-TradeCo").text());
	//加载数据
	$("#DECHead-CX-TradeCo-Con").append(dataText(result.dataInfo));

}