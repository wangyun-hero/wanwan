summerready = function() {
	var user_account = summer.getStorage("USER_ACCOUNT");
	//用户名称
	var hg10 = summer.getStorage("USER_HG10");
	//海关注册编码/海关10位
	if (user_account == undefined) {
		permission(user_account, hg10);
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
			$.each(permissionArray, function(i, e) {
				console.log(e);
			})
		} else {
			console.log(data.errMsg)
		}
	}

	function permissionFaile(data) {
		console.log(data.errMsg)
	}
