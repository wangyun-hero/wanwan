var idType = "";
var idNum = "";
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
	$("#type").mobiscroll().select({
		theme : "ios",
		lang : "zh",
		cancelText : null,
		headerText : function(valueText) {
			return "请选择类型";
		},
	});
	$("#type_dummy").addClass("form-control");

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

		gangaoTongxing : {
			required : true,
			pattern : /^\d{6}$/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入港澳通行证号码</div>',
				pattern : '<div class="field-invalidmsg">通行证号码格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		},
		gangaoID : {
			required : true,
			pattern : /^\d{6}$/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入港澳身份证</div>',
				pattern : '<div class="field-invalidmsg">港澳身份证格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		},
		huzhao : {
			required : true,
			pattern : /^\d{6}$/,
			each : function() {
			},
			descriptions : {
				required : '<div class="field-invalidmsg">请输入护照号码</div>',
				pattern : '<div class="field-invalidmsg">护照格式不正确</div>',
				valid : '<div class="field-validmsg">正确</div>'
			}
		}
	});
	$("#editQiyeForm").mvalidate({
		type : 1,
		onKeyup : true,
		sendForm : true,
		firstInvalidFocus : true,
		valid : function(event, options) {
			var idType = $("#type").val();
			var idNum = $("#idCard").val();
			saveIDCardMess(idType, idNum);
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
		descriptions : {
			username : {
				required : '请输入用户名'
			}
		}
	});
}
function saveIDCardMess(type, num) {
	var viewidT = "com.yonyou.hg12360proj.controller.MdmControler";
	var actionT = "modifyRegInfoByUserId";
	userCardInfo = {
		"USER_ACCOUNT" : summer.getStorage("USER_ACCOUNT"),
		"USER_PASSWORD" : summer.getStorage("USER_PASSWORD"), //密码
		"USER_USERNAME" : summer.getStorage("USER_USERNAME"), //用户名称
		"USER_CREDTYPECD" : type,
		"USER_CREDNO" : num

	};
	$service.writeConfig({
		"host" : ipUrl, // 向configure中写入host键值
		"port" : port
		// 向configure中写入port键值
	})
	$service.callAction({
		"viewid" : viewidT, // 部署在MA上的Controller的包名
		"action" : actionT, // 后台Controller的方法名,
		"params" : userCardInfo, // 自定义参数，json格式
		"autoDataBinding" : false, // 请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
		"contextmapping" : "filedNameOrFieldPath", // 将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
		"callback" : "success()", // 请求成功后回调js方法
		"error" : "failed()"// 请求失败回调的js方法
	});

}

function success(data) {
	if (data.flag == "success") {
		summer.setStorage("USER_CREDTYPECD", idType);
		summer.setStorage("USER_CREDNO", idNum);
		console.log(idType+'身份证号码：'+idNum);
		UM.toast({
			text : "修改成功",
			overlay : false,
			duration : 3000
		});

	}

}
function gotoWodeInfo(){
summer.openWin({
		"url" : URL,
		"id" : ID
	});
}
