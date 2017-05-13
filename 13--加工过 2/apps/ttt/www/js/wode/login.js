var username = "";
var password = "";

summerready = function() {
	yzm();
	var URL = "html/wode/login.html";
	//跳转页面
	$("#main a").click(function() {
		var item = $(this).data("id");
		//alert(item);
		if (item == "youke") {
			api.closeWin();
		} else {
			if (item == "registUser") {
				URL = "html/wode/wodeziliao/registUser.html";
			} else if (item == "wangjimima") {
				URL = "html/wode/wodeziliao/wangjimima.html";
			}
			summer.openWin({
				"id" : "loginView",
				"url" : URL
			});
		}
	});
	//login("18519200023", "123456");
	/*
	$("#loginType").click(function() {
	UM.actionsheet({
	title : '选择登录方式',
	items : ['蓝牙KEY登录', '待定'],
	callbacks : [
	function() {
	alert('蓝牙')
	},
	function() {
	alert('待定')
	}]

	});
	});
	*/
	//点击按钮实现功能

}
function yzm() {
	var inp = document.getElementById('inputCode');
	var code = document.getElementById('code');
	var subMess = document.getElementById('subMessBT');

	var c = ["+", "-", "*", "/"];
	var arr = [];

	for (var i = 0; i < 1000; i++) {
		var num = parseInt(Math.random() * 100 + 1);
		var num2 = parseInt(Math.random() * 100 + 1);
		var num3 = parseInt(Math.random() * 4);
		if (c[num3] === '/') {
			var x = num % num2;
			if (x != 0) {
				num -= x;
				if (num == 0) {
					var temp = num;
					num2 = num;
					num = temp;
				}
			}
		}
		if (num == 0 && num == 0) {
			continue;
		}
		var str = num + c[num3] + num2;
		arr.push(str);
	}

	//======================插件引用主体
	var c = new KinerCode({
		len : 4, //需要产生的验证码长度
		//        chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
		chars : [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], //经典模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
		question : false, //若给定词典为算数题，则此项必须选择true,程序将自动计算出结果进行校验【若选择此项，则可不配置len属性】,若选择经典模式，必须选择false
		copy : false, //是否允许复制产生的验证码
		bgColor : "", //背景颜色[与背景图任选其一设置]
		//bgImg: "bg.jpg",//若选择背景图片，则背景颜色失效
		randomBg : false, //若选true则采用随机背景颜色，此时设置的bgImg和bgColor将失效
		inputArea : inp, //输入验证码的input对象绑定【 HTMLInputElement 】
		codeArea : code, //验证码放置的区域【HTMLDivElement 】
		click2refresh : true, //是否点击验证码刷新验证码
		false2refresh : false, //在填错验证码后是否刷新验证码
		validateObj : subMess, //触发验证的对象，若不指定则默认为已绑定的输入框inputArea
		validateEven : "click", //触发验证的方法名，如click，blur等
		validateFn : function(result, code) {//验证回调函数
			$("#loginForm").mvalidate({
				type : 1,
				onKeyup : true,
				sendForm : true,
				firstInvalidFocus : false,
				valid : function(event, options) {
					//点击提交按钮时,表单通过验证触发函数

					var name = $("#username").val();
					var pass = $("#password").val();
					login(name, pass);
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

				},
				descriptions : {
					username : {
						required : '请输入用户名'
					},
					password : {
						required : '请输入密码'
					}
				}
			});
		}
	});

}

function login(n, p) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "login";
	var parms = "{'user_account':'" + n + "','user_password':'" + p + "'}";
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	})
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : parms, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", // 请求成功后回调js方法
		"error" : "loginFaile()"// 请求失败回调的js方法
	});

}

function success(data) {
	if (data.flag == "success") {
		var datas = $summer.strToJson(data.userInfo);
		var userBaseInfo = {
			"USER_SEX" : datas.USER_SEX, //性别（"1"：男；"0":女）
			"USER_TEL" : datas.USER_TEL, //电话
			"USER_AREA" : datas.USER_AREA, //地址/区域
			"USER_BIRTHDAY" : datas.USER_BIRTHDAY, //出生日期
			"USER_MAIL" : datas.USER_MAIL, //邮件地址
			"USER_ACCOUNT" : datas.USER_ACCOUNT, //账号
			"USER_PASSWORD" : datas.USER_PASSWORD, //密码
			"USER_CREDTYPECD" : datas.USER_CREDTYPECD, //证件类型
			"USER_CREDNO" : datas.USER_CREDNO, //证件号码
			"USER_USERNAME" : datas.USER_USERNAME, //用户名称
			"USER_HG10" : datas.USER_HG10 //海关注册编码/海关10位
		}
		summer.setStorage("userBaseInfo", userBaseInfo);
		summer.setStorage("USER_ACCOUNT", datas.USER_ACCOUNT);
		//账号
		summer.setStorage("USER_PASSWORD", datas.USER_PASSWORD);
		//密码
		summer.setStorage("USER_CREDTYPECD", datas.USER_CREDTYPECD);
		//证件类型
		summer.setStorage("USER_CREDNO", datas.USER_CREDNO);
		//证件号码
		summer.setStorage("USER_USERNAME", datas.USER_USERNAME);
		//用户名称
		summer.setStorage("USER_HG10", datas.USER_HG10);
		//海关注册编码/海关10位
		permission(datas.USER_ACCOUNT, datas.USER_HG10);
		summer.execScript({
			"winId" : "root",
			"frameId" : "wode",
			"script" : "showWode()"
		});
		summer.closeWin();
	} else {
		alert(data.errMsg);
	}
}

function loginFaile(data) {
	//alert("flag:"+data.flag);
	if (data.flag == 'FAILE') {
		alert("errMsg:" + data.errMsg);
	} else if (data.flag == undefined) {
		failed();
	}
}
function permission(n, hg10) {
		if (n == undefined) {
			n = "";
		}
		if (hg10 == undefined) {
			hg10 = "";
		}
		var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
		var actionT = "queryAuthByAccount";
		var parms = "{'user_account':'" + n + "','USER_HG10':'" + hg10 + "'}";
		$service.writeConfig({
			"host" : ipUrl, // 向configure中写入host键值
			"port" : port
			// 向configure中写入port键值
		})
		$service.callAction({
			"viewid" : viewidT, // 部署在MA上的Controller的包名
			"action" : actionT, // 后台Controller的方法名,
			"params" : parms, // 自定义参数，json格式
			"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
			"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
			"callback" : "permissionSuccess()", // 请求成功后回调js方法
			"error" : "permissionFaile()"// 请求失败回调的js方法
		});

	}

	function permissionSuccess(data) {
		var flag = data.flag;
		if (flag == 'success') {
			var datas = data.dataInfo;
			$.each(datas, function(i, e) {
				permissionArray.push(e.code);
			})
			summer.setStorage("permissionArray", permissionArray);
		} else {
			console.log(data.errMsg)
		}
	}

	function permissionFaile(data) {
		console.log(data.errMsg)
	}
