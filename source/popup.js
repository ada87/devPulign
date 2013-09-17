var Url = function(url){
	this._init(url);
};
Url.prototype = {
	protocol:'',
	domain:'',
	port:'',
	path:'',
	query:'',
	isUrl:false,
	_init:function(url){
		var strRegex = "^(https://|http://)"			// url使用的协议	
					+ "([^:/]+)" 						// 主机
					+ "(:[0-9]{1,4})?" 					// 端口- :80
					+ "([^?]*)" 						// 请求路径 “？前面的一串”
					+ "(.*)$";							// 请求参数 “？后面的一串”

		var RegUrl = new RegExp(); 
		RegUrl.compile(strRegex);
		if (RegUrl.test(url)) {
			this.protocol=RegExp.$1;
			this.domain=RegExp.$2;
			this.port=RegExp.$3;
			this.path=RegExp.$4;
			this.query=RegExp.$5;
			this.isUrl=true;
		}
	}
};
var Popup = function(){
	this._init();
};
Popup.prototype = {
	db:null,
	store:[],

	_init:function(){

	var fn=this.getLocalSet;
    chrome.windows.getCurrent(function(currentWindow) {
      chrome.tabs.getSelected(currentWindow.id, fn);
  	});
	this.db = new DataBase();
	this.db.queryUserAgents(this.queryUserAgents);

	},
	getLocalSet:function(tab){
		var url= new Url(tab.url);
		if(url.isUrl){
			$('#current_url').text(url.protocol+url.domain+url.port);
		}else{
			$('#current_url').text('偶卖噶，不是有效的链接哦');
		}
	},
	queryUserAgents : function(tx,result){
		var html='';
        var size=result.rows.length;
        this.store=[];
        for(var i=0;i<size;i++){
            var data=result.rows.item(i);
            html+='<span onclick="javascript:popup.switchUserAgent('+data.uid+')">'+data.name+'</span>';
            this.store.push({uid:data.uid,name:data.name,uastring:data.uastring});
        }
        $('#ua_switch').html(html);
	},

	switchUserAgent : function(uid){
		alert(uid);
	}

}
var popup=null;
$(document).ready(
	function(){
		popup = new Popup();
	}
);