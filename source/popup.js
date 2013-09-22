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
	url:null,

	_init:function(){
		var fn=this.getLocalSet;
	    chrome.windows.getCurrent(function(currentWindow) {
	      chrome.tabs.getSelected(currentWindow.id, fn);
	  	});
		this.db = new DataBase();
		this.db.queryUserAgents(this.queryUserAgents);
		$('#to_option').click(
			function(e){
				chrome.tabs.create({url:chrome.extension.getURL('options.html'),selected:!0});
			}
		);
		$('#ua_clear').click(this.changeUA);
	},
	getLocalSet:function(tab){
		popup.url= new Url(tab.url);
		if(popup.url.isUrl){
			$('#current_url').html(popup.url.protocol+popup.url.domain+popup.url.port);
		}else{
			$('#current_url').html('偶卖噶，不是有效的链接哦');
		}
		$('#current_ua').html('当前UA:' + (Config.get(Config.UA.NAME)==''?'系统Chrome UA':Config.get(Config.UA.NAME)));
		popup.initCookie();
	},
	queryUserAgents : function(tx,result){
		var html='';
        var size=result.rows.length;
        popup.store=[];
        for(var i=0;i<size;i++){
            var data=result.rows.item(i);
            html+='<span id="'+data.uid+'">'+data.name+'</span>';
            popup.store.push({uid:data.uid,name:data.name,uastring:data.uastring});
        }
        $('#ua_switch').append(html);
		var switchUserAgent = function(evt){
			var target=evt.currentTarget;
			popup.changeUA(target.id);
		}
	    $('#ua_switch span').click(switchUserAgent);
	},
	changeUA : function(id){
		var ua=null;
		for(var i=0,j=popup.store.length;i<j;i++){
			if(id==popup.store[i].uid){
				ua=popup.store[i];
			}
		}
		if(ua){
			Config.set(Config.UA.ID,ua.uid);
			Config.set(Config.UA.NAME,ua.name);
			Config.set(Config.UA.UASTR,ua.uastring);
			$('#current_ua').html('当前UA:'+Config.get(Config.UA.NAME));
			chrome.tabs.reload();
		}else{
			Config.remove(Config.UA.ID);
			Config.remove(Config.UA.NAME);
			Config.remove(Config.UA.UASTR);
			$('#current_ua').html('当前UA:系统Chrome UA');
			chrome.tabs.reload();
		}
	},
	initCookie:function(){
		var fn=function(tx,result){
	        var size=result.rows.length;
	        if(size==0){
	        	$('#cookiemanger').html('<div class="cookie" style="text-align:center;">此域名没有设置，请去 <a href="options.html" target="_blank">控制面板</a> 添加</div>');
	        	return;
	        }
	        for(var i=0;i<size;i++){
	            var data=result.rows.item(i);
	            var html = '<div class="cookie">'
	            html += '<span class="label">'+ data.name + ':</span>'
	            html += '<select  name="'+data.name+'" id="c_'+data.cid+'"  type="'+data.type+'" reflush="'+data.reflush+'"></select>';
	            html += '</div>';
	            $('#cookiemanger').append(html);
	           	popup.db.queryCookieValue(data.cid,popup.putCookieValue);
	            $('#c_'+data.cid).change(popup.changeCookie);
	        }
		}
		this.db.queryCookieByDomainName(this.url.domain,fn);
	},
	putCookieValue:function(tx,result){
        var size=result.rows.length;
        var sel=null;
        for(var i=0;i<size;i++){
	        var data=result.rows.item(i);
        	sel=document.getElementById('c_'+data.cid);
        	sel.options.add(new Option(data.sname,data.value));
        }
        $(sel).change(popup.changeCookie);

	},
	changeCookie:function(evt){
		var target=evt.currentTarget;
		var cname=$(target).attr('name');
		var creflush=$(target).attr('reflush');
		var fn=function(){
			if(creflush==1){
				chrome.tabs.reload();
			}
		};
		chrome.cookies.set({
			'domain':popup.url.domain,
			'path':'/',
			'name':cname,
			'value':target.value
			},fn);
	}

}
var popup=null;
$(document).ready(
	function(){
		popup = new Popup();
	}
);