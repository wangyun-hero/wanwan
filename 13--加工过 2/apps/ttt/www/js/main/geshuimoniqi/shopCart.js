x
//购物车测试数据
var users = summer.getStorage("userid");
var dbName = "HGProjSqlite.db";
var searchValueT = "";
//关键词搜索
//查询条件
var pid = "0";
//父级ID
//父ID
var goodsrate_code = null;
//商品编码
var level = null;
//层级
var nodetype = null;
//是否有子节点（0：无，1：有）
var systemPri=0;



	
summerready = function() {
	var header = $summer.byId("pageHeader");
	$summer.fixStatusBar(header);
	var header2 = $summer.byId("pageHeader2");
	$summer.fixStatusBar(header2);
	var header3 = $summer.byId("pageHeader3");
	$summer.fixStatusBar(header3);
	
	
	var datas = [{
		"goodsname" : "食品、饮料",
		"filenumber" : "海关总署公告2016年第25号（关于《中华人民共和国进境物品归类表》和《中华人民共和国进境物品完税价格表》的公告）",
		"rateyear" : "2016",
		"goodsrate_id" : "1",
		"rate" : null,
		"nodetype" : 1,
		"unitname" : null,
		"goodstype" : "1",
		"goodsrate_code" : "1000000",
		"customsvalue" : null,
		"pid" : "0"
	}, {
		"goodsname" : "酒",
		"filenumber" : "海关总署公告2016年第25号（关于《中华人民共和国进境物品归类表》和《中华人民共和国进境物品完税价格表》的公告）",
		"rateyear" : "2016",
		"goodsrate_id" : "27",
		"rate" : null,
		"nodetype" : 1,
		"unitname" : null,
		"goodstype" : "1",
		"goodsrate_code" : "2000000",
		"customsvalue" : null,
		"pid" : "0"
	}];
	//setList(0, 0, 1);
	//获取数据:parm1:层级；parm2：商品编码，默认第一级为0；parm3：是否有子节点（0：无，1：有）
	//require('#imitator');
	//校验
	//getGoodsSumList("Y","");//获取底部工具栏显示商品总数：Y:商品列表,N:该商品购物车是否存在
	//购物车，编辑购物车点击后跳转购物车模块，根据不同入口，该页面显示内容不同
	$("#totalCart,#editTotalCart").click(function() {
		var _id = $(this).attr('id');
		//toPage("#page3");

		//---------------cart
		//var datas = getGoodsSumList("Y","");
		//获取汇总列表list
		var dataLen = datas.length;
		var htmls = '';
		if (dataLen == 0) {
			$("#page3 .um-content").removeClass("none");
			$("#list-footer").addClass("none");
			$("#page3 .um-list").html("<div class='tc' style='margin-top:80px'><div class='um-circle ib' style='width: 150px;height: 150px;line-height: 150px;'><img src='../../../img/geshui/no_data.png' alt='暂无数据' style='width: 67%'></div></div>");
			return false;
		} else {
			$('#page3 .um-content').removeClass('none');
			$("#list-footer").removeClass("none");
			for (var i = 0; i < dataLen; i++) {
				htmls += '<li class="um-listview-row"><a href="#" class="um-list-item um-swipe-action um-no-icon"><div class="um-swipe-btns"><span class="um-swipe-btn um-delete">删除</span></div><div class="um-list-item-inner"><div class="um-list-item-body" style="padding-right:15px; text-indent:15px"><div class="clearfix f14"><div class="um-xs-5 tl um-text-overflow"><span class="goodsname line30">' + datas[i].goodsname + '</span><input type="hidden" value=' + datas[i].goodsrate_code + ' class="goodsrate_code"><input type="hidden" value=' + datas[i].goodsrate_id + ' class="goodsrate_id"><input type="hidden" class="rate" value=' + datas[i].rate + '><input type="hidden" id="customsvalue" value=' + datas[i].customsvalue + '><div class="um-gray f12">单位税款 : <span class="price customsvalue">' + datas[i].customsvalueS + '</span> 元</div></div><div class="um-xs-4 tc um-text-overflow" name="moreWidth" style="text-indent:0"><span class="cart-add">+</span>' + '<input class="goodsnumber um-blue f16 w40 tc" value='+ datas[i].goodsnumber +' readonly="true" style="border:0px solid #ccc"><span class="cart-reduce">-</span><div class="um-gray f12 unitname">' + datas[i].unitname + '</div></div><div class="um-xs-3 tr um-text-overflow um-blue list-right"><div><span class="total line30"></span><span class="f12">元</span></div></div></div></div></div></a></li>'
			}
			$("#page3 .um-list").html(htmls);
		}
		if (_id == 'totalCart') {
			$(".cart-add,.cart-reduce").removeClass("vis");
		} else {
			$("#openEdit").text("完成");
			$(".cart-add,.cart-reduce").addClass("vis");
		}
		total();
		goodSum();
		//构造控件实例
		var listview = UM.listview("#shopCartList");
		listview.on("itemDelete", function(sender, args) {
			//这是可以编写行删除逻辑，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			args.$target.slideUp(500, function() {
				var _index = Number(args.rowIndex);
				var goodsId = $("#shopCartList li:eq(" + _index + ")").find(".goodsrate_id").val();
				args.$target.remove();
				var listLen = $("#shopCartList .um-list li").length;
				if (listLen > 0) {
					goodSum();
					$(".um-sum-cicle").removeClass("none").text(listLen);
				} else {
					$(".um-sum-cicle").addClass("none");
					$("#list-footer").addClass("none");
					$("#page3 .um-list").html("<div class='tc' style='margin-top:80px'><div class='um-circle ib' style='width: 150px;height: 150px;line-height: 150px;'><img src='../../../img/geshui/no_data.png' alt='暂无数据' style='width: 67%'></div></div>");
				}
				deleteGoodsToSqlite(goodsId);
			});

		});
		listview.on("itemSwipeLeft", function(sender, args) {
			//这里可以处理行左滑事件，参数sender即为当前列表实例对象，args对象有2个属性，即rowIndex(行索引)和$target(目标行的jquery对象)
			sender.showItemMenu(args.$target);
		});
	});

};

//页面跳转
function toPage(name) {
	if (name == '#page1') {
		$(".icon-add").parent(".um-footerbar-item").addClass("disable").removeClass("addSum");
        var res=1;		
	} else if (name == '#page2') {
		$(".require").removeClass('borError');
		$(".taxdues").text("");
		$(".icon-add").parent(".um-footerbar-item").removeClass("disable").addClass("addSum");
		var res=0;
	} else {
		$(".icon-add").parent(".um-footerbar-item").addClass("disable").removeClass("addSum");
		var res=0;
	}
	UM.page.changePage({
		target : name,
		isReverse: res
	});

}

//---------search----------------
$("#searchValue").bind('search', function() {
	getGoodsrateMessSearch();
});

function getGoodsrateMessSearch() {
	searchValueT = document.getElementById("searchValue").value;
	//alert("searchValueT : "+searchValueT);
	var sql = "select  _id,goodsrate_id,goodsrate_code,goodsname,goodstype,unitname,customsvalue,rate,rateyear,filenumber,pid,nodetype from cs_goodsrate where nodetype='0' and goodsname like '%" + searchValueT + "%'";
	if (searchValueT == "" || searchValueT == null) {
		$(".project-task-item-container").html("");
		setList(0, 0, 1);
	} else {
		var data = $sqlite.query({
			"db" : dbName,
			"sql" : sql
		});

		//alert("原始数据：" + data);
		var json = JSON.parse(data);
		//alert("json数据：" + json);
		apendHTMLSearch(json);
		//搜索后填充页面
	}
}

function setList(lv, gcode, ntype) {
	pid = gcode;
	goodsrate_code = gcode;
	level = lv;
	nodetype = ntype;
	getGoodsrateMess(pid);
}

function getGoodsrateMess(pid) {
	var sql = sql = "select  _id,goodsrate_id,goodsrate_code,goodsname,goodstype,unitname,customsvalue,rate,rateyear,filenumber,pid,nodetype from cs_goodsrate where pid='" + pid + "'";
	var data = $sqlite.query({
		"db" : dbName,
		"sql" : sql
	});
	//alert("原始数据：" + data);
	var json = JSON.parse(data);
	//alert("json数据：" + json);
	apendHTML(json);
}

function stopEvent(evt) {
	var evt = evt || window.event;
	if (evt.stopPropagation) {
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}
}

function apendHTMLSearch(dataArray) {
	$(".project-task-item-container").html("");
	var datalen = dataArray.length;
	if (datalen < 0) {
		$(".project-task-item-container").html("<p class='tc'>暂无此商品</p>")
		return false;
	} else {
		var htmls = "";
		for (var i = 0; i < datalen; i++) {
			htmls += '<li class="level-item level-' + level + 1 + '-name" ' + ' id=' + dataArray[i].goodsrate_code + ' data-ratecode=' + dataArray[i].goodsrate_code + ' data-pid=' + dataArray[i].pid + ' onclick="setList(' + dataArray[i].goodstype + ',' + dataArray[i].goodsrate_code + ',' + dataArray[i].nodetype + ');stopEvent(event);">' + ' <div class="pr">'
			htmls += '<div class="um-media-body"><h4>' + dataArray[i].goodsname + '</h4><p class="um-gray">税号：' + dataArray[i].goodsrate_code + '</p></div>' + ' <div class="um-media-right"></div>' + ' </div></li>';
		}
		$(".project-task-item-container").html(htmls)
	}
}                                        
function apendHTML(dataArray) {
	var htmls = "";
	// 循环写入本level的数据
	for (var i = 0; i < dataArray.length; i++) {
	if(dataArray[i].nodetype=='0'){
		var Blue='um-blue';
	}
		// 判断这里的元素的父ID是上级的ID，我们需要的才创建li
		if (dataArray[i].pid == goodsrate_code) {
			htmls += '<li class="level-item level-' + level + 1 + '-name" ' + 'id=' + dataArray[i].goodsrate_code + ' data-ratecode=' + dataArray[i].goodsrate_code + ' data-pid=' + dataArray[i].pid + ' onclick="setList(' + dataArray[i].goodstype + ',' + dataArray[i].goodsrate_code + ',' + dataArray[i].nodetype + ');stopEvent(event);"><div class="pr">'
			if (level == 0) {
				htmls += '<div class="um-media-left"><img class="um-circle" height="40" width="40" src="../../../img/geshui/goodsType/' + dataArray[i].goodsrate_code + '.png"></div>'
			}
			htmls += '<div class="um-media-body"><h4 class='+Blue+'>' + dataArray[i].goodsname + '</h4><p class="um-gray">税号：<span>' + dataArray[i].goodsrate_code + '</span></p></div><div class="um-media-right"></div></div></li>';
		}
	}
	// 初始化点击第0级加载第1级时，只需追加到，就可以结束了
	if (level == 0) {
		$(".project-task-item-container").append(htmls);
		return true;
	}

	// 二到四级需判断是否有子ul，没有则需要创建
	var existed = $("#" + goodsrate_code).children("ul").length > 0;
	if (!existed) {// 不存在则创建一个
		$("#" + goodsrate_code).append("<ul></ul>");
		$("#" + goodsrate_code).find(".um-media-right").addClass("btn-down");		
	} else {
		$("#" + goodsrate_code).find("ul").slideToggle();
		$("#" + goodsrate_code).find(".um-media-right").toggleClass("btn-down");		
	}
	$("#" + goodsrate_code).siblings("li").find(".um-media-right").removeClass("btn-down");
	$("#" + goodsrate_code).siblings("li").find("ul").not($("#" + goodsrate_code)).slideUp();
	if (nodetype == "0") {//当叶子节点为0时候，跳转到该商品税率模拟器
		serviceDosmt();
		toPage("#page2");

	}

	$("#" + goodsrate_code).children("ul").html(htmls);
}

//---------------------------Detail

function serviceDosmt() {//详情 记征税款计算器
	var sqls = "select  _id,goodsrate_id,goodsrate_code,goodsname,goodstype,unitname,customsvalue,rate,rateyear,filenumber,pid,nodetype from cs_goodsrate where goodsrate_code='" + goodsrate_code + "'";
	var getdata = $sqlite.query({
		"db" : dbName,
		"sql" : sqls
	});
	//alert("detail:" + JSON.parse(getdata).length);
	showView(JSON.parse(getdata));
}

function showView(result) {
	if (result != null) {
		var Rate = toPercent(result[0].rate);
		$('#imitator #goodsname').text(result[0].goodsname);
		$("#imitator .goodsnumber").val("1");
		//商品数量
		$("#imitator .goodsrate_id").val(result[0].goodsrate_id);
		//商品税率ID
		$("#imitator #rate").val(result[0].rate);
		$("#imitator .rate").text(Rate);
		$("#imitator .unitname").text(result[0].unitname);
		//单位名称
		$("#imitator .goodsrate_code").val(result[0].goodsrate_code);
		//完税价格
		$("#imitator .customsvalue").val(result[0].customsvalue);
		systemPri=result[0].customsvalue;
	} else {
		alert("暂无数据！");
	}

}


$("#btn-tax-commit").click(function() {//计算按钮逻辑
	if (!ifApply('#imitator'))
		return false;
	var sum = +$("#imitator .goodsnumber").val();
	var price =+$("#imitator .customsvalue").val();
	var rate = +$("#imitator #rate").val();
	if((0.5*systemPri)<=price&&price<=(2*systemPri)){
		var taxdues = fmoney((sum * systemPri * rate).toFixed(2));
	}else{
		var taxdues = fmoney((sum * price * rate).toFixed(2));
	}
	$(".taxdues").text(taxdues);
});

//---------Cart-----------------
//add
$(".um-content").on("click", ".cart-add", function() {
	var _this = $(this);
	var _thisNum = parseInt(_this.next($(".goodsnumber")).val());
	var sum = _thisNum + 1;
	_this.next($(".goodsnumber")).val(sum);
	// total
	var price = parseFloat(_this.parents(".clearfix").find(".price").text()).toFixed(2);
	var number = parseInt(_this.next($(".goodsnumber")).val());
	var total = parseFloat(price * number).toFixed(2);
	_this.parents(".clearfix").find(".total").text(fmoney(total));
	goodSum();
});

//reduce
$(".um-content").on("click", ".cart-reduce", function() {
	var _this = $(this);
	var _thisNum = parseInt($(this).prev($(".goodsnumber")).val());
	if (_thisNum > 1) {
		var sum = _thisNum - 1;
		_this.prev($(".goodsnumber")).val(sum);
		// total
		var price = parseFloat(_this.parents(".clearfix").find(".price").text()).toFixed(2);
		var number = parseInt(_this.prev($(".goodsnumber")).val());
		var total = parseFloat(price * number).toFixed(2);
		_this.parents(".clearfix").find(".total").text(fmoney(total));
		goodSum();
	} else {
		return false;
	}
});

$("#openEdit").click(function() {//编辑、完成切换，完成时提交数据
	var _this = $(this);
	if (_this.text() == '完成') {
		_this.text("编辑");
		$(".cart-add,.cart-reduce").removeClass('vis');
		var liLen = $(".um-content .um-title-con").length;
		if (liLen > 0) {
			var dataArrayList = [];
			$("#shopCartList ul li").each(function() {
				dataArrayList.push({
					"goodsname" : $(this).find(".goodsname").text(),
					"goodsnumber" : $(this).find(".goodsnumber").val(), //商品数量
					"rate" : $(this).find(".rate").val(),
					"unitname" : $(this).find(".unitname").text(), //单位名称
					"goodsrate_code" : $(this).find(".goodsrate_code").val(),
					"customsvalue" : $(this).find("#customsvalue").val(),//完税价格
				})
			});
			dataArrayList.join();
			deleteGoodsToSqlite();
			addGoodsToSqlite(dataArrayList);
		}
		//后台发送购物车内商品信息
	} else {
		_this.text("完成");
		$(".cart-add,.cart-reduce").addClass('vis');
		//$("#shopCartCon .goodsnumber").attr("readonly",false).css("border","1px solid #ccc");
	}
});


//向后台发送购物车内商品信息
$("#goback").click(function() {
	toPage("#page1");
	getGoodsSumList("Y","");
});

//清空购物车
$("#btn-clean-commit").click(function() {
	$(".um-sum-cicle").addClass("none").text("0");
	$("#list-footer").addClass("none");
	$("#page3 .um-list").html("<div class='tc' style='margin-top:80px'><div class='um-circle ib' style='width: 150px;height: 150px;line-height: 150px;'><img src='../../../img/geshui/no_data.png' alt='暂无数据' style='width: 67%'></div></div>");
	$("#shopCartList li").remove();
	deleteGoodsToSqlite();
});

function total() {//小结
	var Sum = 0;
	$("#page3 .um-list li").each(function(i, e) {
		var price = parseFloat($(this).find(".customsvalue").text()).toFixed(2);
		var sum = parseFloat($(this).find(".goodsnumber").val()).toFixed(2);
		Sum = (price * sum).toFixed(2);
		$(this).find(".total").text(fmoney(Sum));
	});

}

function goodSum() {//总价
	var Sum = 0;
	$(".total").each(function(i, e) {
		var rmoneyTex = rmoney($(this).text());
		var num = parseFloat(rmoneyTex).toFixed(2);
		Sum = (Sum * 1 + num * 1).toFixed(2);
	});

	$("#sumResult").text(fmoney(Sum));
}

//----------------------------footer
function addGoodsToSqlite(lists) {

	var len = lists.length;
	//alert("add:" + len);
	var sqls = "";
	for (var i = 0; i < len; i++) {
		sqls = "insert into cs_goodsratesum(goodsrate_id,goodsrate_code,goodsname,unitname,customsvalue,rate,goodsnumber,userid) values ('" + lists[i].goodsrate_id + "','" + lists[i].goodsrate_code + "','" + lists[i].goodsname + "','" + lists[i].unitname + "','" + lists[i].customsvalue + "','" + lists[i].rate + "','" + lists[i].goodsnumber + "','" + users + "')";
		$sqlite.execSql({
			"db" : dbName,
			"sql" : sqls
		});
	}
};
function deleteGoodsToSqlite(id) {
	var sqls = "";
	if (id != null && id != "") {
		sqls = "delete from cs_goodsratesum where goodsrate_id='" + id + "'";
	} else {
		sqls = "delete from cs_goodsratesum";
	}
	$sqlite.execSql({
		"db" : dbName,
		"sql" : sqls
	})
};

function getGoodsSumList(flag,id) {
	var sqls = "select distinct b.goodsrate_id,a.goodsrate_code,b.goodsname,b.unitname,b.customsvalue*rate customsvalueS,customsvalue,b.rate,a.goodsnumber,b.userid from (select goodsrate_code,sum(goodsnumber) goodsnumber from cs_goodsratesum g group by g.goodsrate_code) a ,cs_goodsratesum b  where a.goodsrate_code = b.goodsrate_code";
	var getdata = $sqlite.query({
		"db" : dbName,
		"sql" : sqls
	});
		var list = JSON.parse(getdata);
		var listL = list.length;
	if (flag == 'N') {	
		var dataArrayList = [];
		if (listL > 0) {
			for (var i = 0; i < listL; i++) {
				var goodsrate = list[i].goodsrate_code;
				dataArrayList.push(goodsrate);
			}
			dataArrayList.join();
			return $.inArray(id,dataArrayList);
		}
	} else {
		if (listL > 0 && listL <= 99) {
			$(".um-sum-cicle").removeClass("none").text(listL);
			$(".icon-edit").parent("um-footerbar-item").removeClass("disable");
		} else if (listL > 0 && listL > 99) {
			$(".um-sum-cicle").removeClass("none").text("99+");
			$(".icon-edit").parent("um-footerbar-item").removeClass("disable");
		} else {
			$(".um-sum-cicle").addClass("none");
			$(".icon-edit").parent("um-footerbar-item").addClass("disable");
		}	
		return JSON.parse(getdata);
	}

}

function getGoodsToSqlite(isCount) {
	var sqls = "select goodsrate_id,goodsrate_code,goodsname,unitname,customsvalue,rate,goodsnumber,userid from cs_goodsratesum";
	var getdata = $sqlite.query({
		"db" : dbName,
		"sql" : sqls
	});
	var list = JSON.parse(getdata);
	var listL = list.length;
	if (isCount == 'Y') {
		if (listL > 0 && listL <= 99) {
			$(".um-sum-cicle").removeClass("none").text(listL);
			$(".icon-edit").parent("um-footerbar-item").removeClass("disable");
		} else if (listL > 0 && listL > 99) {
			$(".um-sum-cicle").removeClass("none").text("99+");
			$(".icon-edit").parent("um-footerbar-item").removeClass("disable");
		} else {
			$(".um-sum-cicle").addClass("none");
			$(".icon-edit").parent("um-footerbar-item").addClass("disable");
		}
	} else {
		return JSON.parse(getdata);
	}
};

$(".um-footer").on('click', '.addSum', function() {//加入汇总 传参
	var num = +$(".um-sum-cicle").text() || 0;
	var rateCode = $("#imitator .goodsrate_code").val();
	var check = getGoodsSumList("N", rateCode);                    
	if (check == '-1'||check == undefined) {                                                                                                                    
		sumNum = num + 1;
		$(".um-sum-cicle").removeClass("none").text(sumNum);
	}
	//获取加入汇总的商品Id
	var dataArryList = [{
		"goodsname" : $('#imitator #goodsname').text(),
		"goodsnumber" : $("#imitator .goodsnumber").val(), //商品数量
		"goodsrate_id" : $("#imitator .goodsrate_id").val(), //商品税率ID
		"rate" : $("#imitator #rate").val(),
		"unitname" : $("#imitator .unitname").text(), //单位名称                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
		"goodsrate_code" : $("#imitator .goodsrate_code").val(),
		"customsvalue" : $("#imitator .customsvalue").val(),//完税价格
	}];
	addGoodsToSqlite(dataArryList);
});

//-------------------------require

function isNum(str) {
	var regExp = new RegExp("^[0-9].*$");
	var i = Number(str);
	return regExp.test(i)
}

function require(require) {//验证input框
	var requires = $(require).find('.require');
	$('body').on('keyup', requires, function(e) {
		$(requires).removeClass('borError');
	});
}

function ifApply(require) {
	var requires = $(require).find('.require');
	for (var i = 0; i < requires.length; i++) {
		var _this = requires[i];
		if ($(_this).is(":visible"))
			requireCom(_this);
	}
	if ($(require).find('.borError').length == 0)
		return true;
	else
		return false;
}

function requireCom(target) {
	var $parent = $(target).parent(),
	    thisVal = $(target).val();
	$(target).removeClass('borError');
	if ($(target).hasClass('isNum')) {
		if (thisVal == '' || !isNum(thisVal)) {
			$(target).addClass('borError');
			var alertModal = UM.modal("tips", {
				title : window.location.host || "",
				text : "请正确填写信息",
				overlay : true,
				delay : 1000
			});
			setTimeout(function() {
				alertModal.destory();
			}, 3000);
			return;
		};
	}
}

// 显示千分位
function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
	    r = s.split(".")[1];
	t = "";
	for ( i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

//千分位还原
function rmoney(s) {
	return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

//小数转百分比
function toPercent(data) {
	var strData = parseFloat(data) * 100;
	var ret = strData.toString() + "%";
	return ret;
}