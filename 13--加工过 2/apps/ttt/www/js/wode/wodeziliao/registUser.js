var wait = 10,
    yzmMess = '',
    yzm = '';
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
	}
	$("#username").blur(function() {//当输入用户名的文本框失去焦点时
		userNameYZ();

	})
	//类型
	$("#cardType").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#cardType_dummy").addClass("form-control").attr("readonly", false);

	//校验
	$.mvalidateExtend({
		phone : {
			required : true,
			pattern : /^0?1[3|4|5|8][0-9]\d{8}$/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入手机号码</div>',
				pattern : '<div class="field-invalidmsg">手机号码格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		},
		cardId : {
			required : true,
			pattern : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入身份证号码</div>',
				pattern : '<div class="field-invalidmsg">身份证号码格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		},
		code : {
			required : true,
			pattern : /^\d{6}$/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入验证码</div>',
				pattern : '<div class="field-invalidmsg">验证码格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		}
	});
	$("#registForm").mvalidate({
		type : 1,
		onKeyup : true,
		sendForm : true,
		firstInvalidFocus : true,
		valid : function(event, options) {
			//点击提交按钮时,表单通过验证触发函数
			var username = $("#username").val();
			var password = $("#pwd").val();
			var repwd = $("#repwd").val();
			var phone = $("#phone").val();
			var cardType = $("#cardType option:selected").val();
			var idCard = $("#idCard").val();
			yzm = $("#yzm").val();
			if (wait > 0) {
				if (yzmMess == yzm) {
					var DateTime=getNowFormatDate()
					regist(username, password, phone,cardType,idCard,DateTime);
				} else {
					UM.toast({
						text : '验证码错误！',
						duration : 3000
					})
					return false;
				}

			} else {
				UM.toast({
					text : '验证码失效，重新获取验证码!',
					duration : 3000
				})
				return false;
			}
			event.preventDefault();
		},
		invalid : function(event, status, options) {
			//点击提交按钮时,表单未通过验证触发函数
		},
		eachField : function(event, status, options) {
			//点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
		},
		eachValidField : function(val) {
		},
		eachInvalidField : function(event, status, options) {
		},
		conditional : {
			confirmpwd : function(val) {
				return val == $("#pwd").val();
			}
		},
		descriptions : {
			username : {
				required : '请输入用户名'
			},
			password : {
				required : '请输入密码'
			},
			confirmpassword : {
				required : '请再次输入密码',
				conditional : '两次密码不一样'
			},
			age : {
				required : '请输入年龄',
				pattern : '年龄格式不正确'
			},
			address : {
				required : '请选择地址'
			},
			intro : {
				required : '请输入个人介绍'
			},
			favourite : {
				required : '请选择兴趣爱好'
			},
			sex : {
				required : '请选择性别'
			},
			captchacode : {
				required : '请输入验证码',
				conditional : '您输入的验证码不正确'
			},
		}
	});
}
/************************检验用户名唯一性***********************/
//
function userNameYZ() {//username失去焦点
	var username = $("#username").val();
	validateUserName(username);
};

function validateUserName(n) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "checkAccountExist";
	var parms = "{'user_account':'" + n + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "userNameSuccess()", // 请求成功后回调js方法
		"error" : "UserNameFaile()"
	});

}

function userNameSuccess(data) {
	if (data.flag == "success") {
	} else {
		umAlertModel(data.errMsg);
		$("#tip").val(data.errMsg);
		$("#tip").fadeIn(2000).fadeOut(5000);
	}
}

function UserNameFaile(data) {//验证失败处理

}

/*==========================================================*/
//获取当前时间，格式YYYY-MM-DD
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

/************************生成验证码并倒计时***********************/
//验证码生成方法并生成倒计时
function makeYZM() {//验证码生成方法并生成倒计时
	//1生成验证码；
	yzmMess = MathRand();
	alert(yzmMess);
	//2生成倒计时；
	scdaojishi(wait);
	//3根据 （手机号，验证码） 调用后台方法，向用户发送验证码
	phone = $("#phone").val();
	sendMessToUser(phone, yzmMess);
	//调用后台方法，向用户发送验证码
}

//生成验证码；
function MathRand() {
	var Num = "";
	for (var i = 0; i < 6; i++) {
		Num += Math.floor(Math.random() * 10);
	}
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

/************************向用户发送验证码 ***********************/
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

	} else {
		alert(data.errMsg);
	}
}

function sendMessToUserFaile(data) {
}

/*==========================================================*/

function regist(name, pwd, p, type, num,time) {
	var devInfo = summer.getDeviceInfo();
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "registUser";
	var parms = {
		"user_account" : p, //必须赋值手机号码,否则失败
		"user_password" : pwd,//密码
		"user_userName" : name,//用户名称
		"user_credTypecd" : type,//证件类型
		"user_credNo" : num,
		"user_mobileUserFlag" : devInfo.deviceid,
		"user_userResource" : "3",
		"user_sex" : "1",
		"user_area" : "北京市",
		"user_birthday" : time,
		"user_mail" : "",
		"user_cardNo" : "",
		"user_type" : "0"

	}
	alert(parms);
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	});
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "registSuccess()", // 请求成功后回调js方法
		"error" : "registFailed()"// 请求失败回调的js方法
	});

}

function registSuccess(result) {
	var flag = result.flag;
	if (flag == 'success') {
		//注册成功，页面跳转到首页或者我的页面
		summer.openWin({
			"id" : 'login',
			"url" : 'html/wode/login.html',
			"pageParam" : {
				"count" : 1
			}
		});
	} else {
		UM.toast({
			text : '注册失败',
			overlay : false,
			duration : 3000
		});
	}

}

function registFailed(data) {
	UM.toast({
		text : '注册失败',
		overlay : false,
		duration : 3000
	});
}

/*==========================================================*/