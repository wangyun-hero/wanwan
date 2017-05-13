var cacheManager = {
	duration : G__Cache_Duration, //60秒
	setCache : function(key, data, duration) {
		try {
			var _obj = {
				data : data,
			/*	tenantid : G_CurUserInfo.tenantid,
				usercode : G_CurUserInfo.u_usercode,
				*/
				level : "",
				datetime : (new Date()).getTime(),
				duration : duration || this.duration
			}
	
			summer.setStorage(key, _obj);
		} catch(e) {
			alert("ERR100:setCache出错了\n" + e);
		}
	},
	getCache : function(key) {
		try {
			var curT = (new Date()).getTime();
			var old = null;
			//旧数据
			try {
				old = summer.getStorage(key);
			} catch(e) {
				alert("ERR104:缓存数据转json出错了,\n仅支持json数据缓存\n" + e);
				return null;
			}
			if (old == null)
				return;
			var tid = old.tenantid;
			var ucode = old.usercode;
			if (tid == G_CurUserInfo.tenantid && ucode == G_CurUserInfo.u_usercode) {
				var oldT = old.datetime;
				var dur = old.duration;
				if (curT - parseInt(oldT) <= parseInt(dur)) {
					return old.data;
				} else {
					summer.rmStorage(key);
					return null;
				}
			} else {
				//缓存数据不是当前租户下当前用户的缓存
				return null;
			}
		} catch(e) {
			alert("ERR103:getCache出错了\n" + e);
		}
	}
}