summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	var newPwd="";
	var arrys = netAvailable();
	if (!arrys.flag) {
		noNet(arrys.jsPath);
		return false;
	} else {
		$(".notFound").removeClass("none");
	}
	//页面跳转
	$("#wangjimima").click(function() {
		summer.openWin({
			"url" : "html/wode/wodeziliao/wangjimima.html",
			"id":"wangjimima"
		});
	})
	$("#editPwdForm").mvalidate({
		type : 1,
		onKeyup : true,
		sendForm : true,
		firstInvalidFocus : true,
		valid : function(event, options) {
			newPwd = $("#newpwd").val();
			var renewPwd = $("#renewpwd").val();
			var oldPwd = $("#oldpwd").val();
			var userAccunt = summer.getStorage("USER_ACCOUNT");
			submitInfo(userAccunt, oldPwd, newPwd);
			event.preventDefault();
		},
		invalid : function(event, status, options) {
			alert("failed");
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
				return val == $("#newpwd").val();
			},
		},
		descriptions : {
			password : {
				required : '请输入新密码'
			},
			confirmpassword : {
				required : '请再次输入密码',
				conditional : '两次密码不一样'
			},
		}
	});

}
function submitInfo(account,oldpwd,newpwd) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "modifyPasswordByUserId";
	var parms = {
	'user_account':account,
	'user_userOldPw':oldpwd,
	'user_userNewPw':newpwd
	};
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
		"callback" : "success()", // 请求成功后回调js方法
		"error" : "failed()"
	});

}

function success(result) {
	var flag = result.flag;
	if (flag == "success") {
	summer.setStorage("USER_PASSWORD")
		UM.toast({
			text : '修改成功 ',
			duration : 3000
		})
		
	}else{
	UM.toast({
			text : result.errMsg,
			duration : 3000
		})
	}
}