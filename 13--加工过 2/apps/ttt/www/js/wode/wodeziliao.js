summerready = function() {
	var userBaseInfo = [];
	//改变状态栏的颜色
	var header1 = $summer.byId("pageHeader1");
	$summer.fixStatusBar(header1);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	var header3 = $summer.byId("pageHeader3");
	$summer.fixStatusBar(header3);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
		var userBaseInfoArray = summer.getStorage("userBaseInfo");
		setUserMess(userBaseInfoArray);

	}

	//页面跳转
	$(".baseInfo a.um-list-item").click(function() {
		Type = $(this).data("type");
		if (Type != undefined) {
			var Txt = $(this).find(".um-xs-5 span").text();
			$("#wodeziliaoEdit .um-list").addClass("none");

			$("#" + Type + "Con").removeClass("none");
			$("#pageHeader2 h3").text(Txt);
			toPage("#page2");
		} else
			return false;
	});

	$("#goBack").click(function() {
		if (Type == 'sex') {
			var editVal = $("#sexCon li input:checked").val() == "1" ? "男" : "女";
			$("#page1 .USER_SEX").text(editVal);
			toPage("#page1");
		} else if (Type == 'brithDay' || Type == 'mail') {
			var $target = $("#" + Type + "Con").find("input");
			var editVal = $target.val();
			$("#page1 .um-list-item[data-type=" + Type + "]").find(".um-xs-7").text(editVal);
			toPage("#page1");
		} else {
			var $target = $("#" + Type + "Con").find("input");
			var editVal = $target.val();
			if (editVal == "") {
				UM.toast({
					overlay : false,
					text : '请正确填写信息',
					duration : 2000
				});
				return false;
			} else {
				$("#page1 .um-list-item[data-type=" + Type + "]").find(".um-xs-7").text(editVal);
				toPage("#page1");
			}
		}
	});

	$("#sexCon li").click(function() {
		$(this).siblings().find(".sex").removeClass("active");
		$(this).find(".sex").addClass("active");

	});
	$("#page2 .zone").change(function() {
		$("#zoneInput").val($(this).val());
	});
	//类型
	$("#zone").mobiscroll().select({
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

}
function setUserMess(data) {
	UM.hideLoadingBar();
	//页面初始化-渲染页面信息
	$.each(data, function(i, e) {
		//填充显示界面	//填充编辑界面
		if (i == 'USER_PASSWORD' || i == 'USER_CREDNO' || i == 'USER_TYPE') {
			if ($("." + i).is('input')) {
				$("#page3 ." + i).val(e);
			} else {
				$("#page3 ." + i).text(e);
			}
		} else if (i == 'USER_SEX') {
			if (e == 1) {
				$(".USER_SEX").text("男");
			} else {
				$(".USER_SEX").text("女");
			}
			$("#page2 .sex input[name='sex'][value=" + data.USER_SEX + "]").attr("checked", true).parent(".sex").addClass("active");
		} else if (i == 'USER_AREA') {
			$("#page2 .zone").val(data.USER_AREA);
		} else {
			$("#page1 ." + i).text(e);
			$("#page2 ." + i).val(e);
		}

	});
}

function gotoPage(URL, ID) {
	summer.openWin({
		"url" : URL,
		"id" : ID
	});
}

function toPage(name) {
	if (name == '#page1') {
		var res = 1;
	} else {
		var res = 0;
	}
	UM.page.changePage({
		target : name,
		isReverse : res
	});

}

function saveUserMess() {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "modifyRegInfoByUserId";
	userBaseInfo = {
		"USER_SEX" : $("#sexCon input:radio:checked").val(), //性别（"1"：男；"0":女）
		"USER_TEL" : $(".USER_TEL").text(), //电话
		"USER_AREA" : $(".USER_AREA").text(), //地址/区域
		"USER_BIRTHDAY" : $(".USER_BIRTHDAY").text(), //出生日期
		"USER_MAIL" : $(".USER_MAIL").text(), //邮件地址
		"USER_ACCOUNT" : summer.getStorage("USER_ACCOUNT"), //账号
		"USER_PASSWORD" : summer.getStorage("USER_PASSWORD"), //密码
		"USER_CREDTYPECD" : summer.getStorage("USER_CREDTYPECD"), //证件类型
		"USER_CREDNO" : summer.getStorage("USER_CREDNO"), //证件号码
		"USER_USERNAME" : $(".USER_USERNAME").text(), //用户名称
	};
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	})
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : userBaseInfo, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", // 请求成功后回调js方法
		"error" : "failed()"// 请求失败回调的js方法
	});

}

function success(data) {
	if (data.flag == "success") {
		summer.setStorage("userBaseInfo", userBaseInfo);
		$.each(userBaseInfo, function(i, e) {
			console.log(i, e);
		})
		UM.toast({
			text : "修改成功",
			overlay : false,
			duration : 3000
		})
		setTimeout(function() {
			summer.closeWin();
		}, 3000)

	}
}

function failed(data) {
	alert(data.errMsg)
}