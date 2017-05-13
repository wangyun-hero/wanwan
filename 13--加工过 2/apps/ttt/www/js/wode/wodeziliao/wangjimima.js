var wait = 120;
var token = "";
var phone = "";
var newPwd="";
summerready = function() {
	//改变状态栏的颜色
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	/*检测网络*/
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
	}
	//点击确认的时候
	$("#confirmBtn").click(function() {
		newPwd = $("#newpwd").val();
		var renewpwd = $("#renewpwd").val();
		var yzmNum = $("#getPhoneYZM").val();
		if (newpwd == renewpwd) {
			alert("密码输入正确！");
			YZYZM(phone, token, yzmNum);
		} else {
			alert("两次密码输入 不一致！");
		}

	})
}
function makeYZM() {
	//1生成验证码；
	yzm = MathRand();
	//2生成倒计时；
	scdaojishi(wait);
	//3根据 （手机号，验证码） 调用后台方法，向用户发送验证码
	phone = $("#phone").val();
	sendMessToUser(phone, yzm, token);
	//获取token
	getToken(phone)

}

//生成验证码；
function MathRand() {
	var Num = "";
	for (var i = 0; i < 6; i++) {
		Num += Math.floor(Math.random() * 10);
	}
	umAlertModel("Num:" + Num);
	return Num;
}

//生成倒计时
function scdaojishi(obj) {
	if (obj == 0) {
		$("#getPhoneYZM").attr("disabled", false);
		$("#getPhoneYZM").css({
			"background" : "#0070C0",
			"color" : "#FFFFFF"
		});
		$("#getPhoneYZM").val("重新发送");
		wait = 120;
	} else {
		$("#getPhoneYZM").attr("disabled", true);
		$("#getPhoneYZM").css({
			"background" : "#E2E2E2",
			"color" : "#8A8080"
		});
		$("#getPhoneYZM").val(wait + "秒");
		wait--;
		setTimeout(function() {
			scdaojishi(wait);
		}, 1000)
	}
}

function sendMessToUser(p, n) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "sendShortMessage";
	var parms = "{'sms_number':'" + p + "','sms_content':'" + n + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port,
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "sendMessToUserSuccess()", // 请求成功后回调js方法
		"error" : "sendMessToUserFaile()"
	});

}

function sendMessToUserSuccess(data) {
	if (data.flag == "success") {
		console.log("success")
	} else {
		umAlertModel(data.errMsg);
	}
}

function sendMessToUserFaile(data) {

}

function getToken(p) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "backPwdGeToken";
	var parms = "{'sms_number':'" + p + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port,
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successToken()", // 请求成功后回调js方法
		"error" : "faile()"
	});
}

function successToken(result) {
	token = result.TOKEN;
}

//验证验证码
function YZYZM(p, t, n) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "backPwdVerifyCode";
	var parms = "{'sms_number':'" + p + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port,
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successToken()", // 请求成功后回调js方法
		"error" : "faile()"
	});
}

function successYZYZM() {
	XGMM(phone,token,newPwd);
}

function XGMM(p,t,pw) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "backPwdModifyPwd";
	var parms = "{'sms_number':'" + p + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port,
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "successXGMM()", // 请求成功后回调js方法
		"error" : "faile()"
	});
}
function successXGMM(){

}