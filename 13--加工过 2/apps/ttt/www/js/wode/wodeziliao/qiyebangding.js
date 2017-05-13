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
		UM.showLoadingBar({
			text : "正在加载",
			overlay : false,
			icons : 'ti-loading'
		})
	}
	UM.hideLoadingBar();
	//类型
	$("#moldvalue").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#moldvalue_dummy").addClass("form-control")

	$("#editPwdForm").mvalidate({
		type : 1,
		onKeyup : true,
		sendForm : true,
		firstInvalidFocus : true,
		valid : function(event, options) {
			var moldvalue = $("#mold option:selected").val();
			var comname = $("#comname").val();
			var comcode = $("#comcode").val();
			var userAccunt = summer.getStorage("userAccunt");
			saveUserMess();
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
function saveUserMess() {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "modifyRegInfoByUserId";
	userCardInfo = {
		"USER_ACCOUNT" : summer.getStorage("userAccunt"),
		"USER_CREDTYPECD" : $(".USER_USERNAME option:selected").val(),
		"USER_CREDNO":$(".USER_USERNAME").val()
		
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
		alert(ok);
		summer.setStorage("userCardInfo", userCardInfo);
		UM.toast({
			text : 修改成功,
			overlay : false,
			duration : 3000
		});

	}

}

