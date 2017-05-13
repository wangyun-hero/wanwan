//previous page id, current page id
var prevPid = '',
    curPid = '';
//save opened frame name
var frameArr = [];

var y = 0;
var width = 0;
var height = 0;

//frame whether open
function isOpened(frmName) {
	var i = 0,
	    len = frameArr.length;
	var mark = false;
	for (i; i < len; i++) {
		if (frameArr[i] === frmName) {
			mark = true;
			return mark;
		}
	}
	return mark;
}

function switchImg(viewCode){
if (viewCode == "main") {
	    $summer.byId('mainImg').src="img/bot_mainS.png";
	    $summer.byId('zizhufuwuImg').src="img/bot_zizhufuwuK.png";
	    $summer.byId('kefuzhongxinImg').src="img/bot_kefuzhongxinK.png";
	    $summer.byId('wodeImg').src="img/bot_wodeK.png";
	}else if (viewCode == "zizhufuwu") {
	    $summer.byId('mainImg').src="img/bot_mainK.png";
	    $summer.byId('zizhufuwuImg').src="img/bot_zizhufuwuS.png";
	    $summer.byId('kefuzhongxinImg').src="img/bot_kefuzhongxinK.png";
	    $summer.byId('wodeImg').src="img/bot_wodeK.png";
	} else if (viewCode == "kefuzhongxin") {
	    $summer.byId('mainImg').src="img/bot_mainK.png";
	    $summer.byId('zizhufuwuImg').src="img/bot_zizhufuwuK.png";
	    $summer.byId('kefuzhongxinImg').src="img/bot_kefuzhongxinS.png";
	    $summer.byId('wodeImg').src="img/bot_wodeK.png";
	} else if (viewCode == "wode") {
		$summer.byId('mainImg').src="img/bot_mainK.png";
	    $summer.byId('zizhufuwuImg').src="img/bot_zizhufuwuK.png";
	    $summer.byId('kefuzhongxinImg').src="img/bot_kefuzhongxinK.png";
	    $summer.byId('wodeImg').src="img/bot_wodeS.png";		
	} 
}

function assignment(type, titles) {
	//$summer.byId("viewTitle").innerHTML = "<div id='viewTitle' class='um-common-title'  style='width:56px;height:30px;position:absolute;left:50%;right:50%;top:50%;bottom:0;margin-left:-28px;margin-top:-18px;'><img  src='img/logo.png' alt=''  style='width:100%;height:auto'></div>";
	switchImg(type);	
}

function openTab(type, titles) {
    var header = $summer.byId("header");
    $summer.fixStatusBar(header);
	y = $summer.offset($summer.byId('header')).h;
	width = $summer.offset(document.getElementsByTagName("body")[0]).w;
	height = $summer.offset($summer.byId('mainContent')).h;

	assignment.call(this, type, titles);
	
	
	//record page id
	prevPid = curPid;
	curPid = type;
	if (prevPid !== curPid) {

		if (isOpened(type)) {
			summer.window.setFrameAttr({
				id : type,
				hidden : false
			}, null, null);
		} else {
			var urlS = 'html/' + type + '/' + type + '.html';
			//$alert("urlS:"+urlS);
			summer.openFrame({
				id : type,
				url : urlS,
				rect : {
					x : 0,
					y : y,
					w : width,
					h : height
				}
			});
			//alert("framId:"+type);
			frameArr.push(type);
		}
		if (prevPid) {
			summer.window.setFrameAttr({
				id : prevPid,
				hidden : true
			}, null, null);
		}
	}
}

summerready = function() {
	$sqlite.openDB({//打开sqlite
         "db" : "HGProjSqlite.db"
    });
    sysnGoodsrate();//同步商品税率表
	openTab('main', '首页');
}
