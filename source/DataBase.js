;var DataBase=function(){
	this._initDB();
};
DataBase.prototype={
	//数据库名称，版本，显示名称，大小
	_name:'xd_devtools',
	_version:'1.0',
	_display:'xd_devtools database',
	_size:1024*1024*50,
	//初始化一个连接对象
	_db:null,
	_initDB:function(){
		if(this._db==null){
			this._db=window.openDatabase(this._name,this._version,this._display,this._size);
		}	},
/*
		this._update();
	_update:function(){
		this.addUserAgent('IE10(WinPhone Nokia920)','Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',10);
		this.addUserAgent('IE10','Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0; Touch)',10);
		this.addUserAgent('IE9','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)',10);
		this.addUserAgent('IE8','Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; BTRS124307)',10);
		this.addUserAgent('IE7','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)',10);
		this.addUserAgent('FireFox18','Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',10);
		this.addUserAgent('Chrome29','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36',10);
		this.addUserAgent('SAMSUNG GALAXY TAB','Mozilla/5.0 (Linux; U; Android 2.2; en2; SAMSUNG GT-P1000 Tablet Build/MASTER) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',9);
		this.addUserAgent('iPad','Mozilla/5.0 (iPad; CPU OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B141 Safari/8536.25',10);
		this.addUserAgent('iPhone','Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B143 Safari/8536.25',10);
		this.addUserAgent('Google nexus','Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',10);
		this.addUserAgent('Xbox','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Xbox)',10);
		this.addUserAgent('Opera9','Opera/9.80 (Windows NT 5.1; U; en) Presto/2.10.289 Version/12.01',10);
		this.addUserAgent('HTC Desire','Mozilla/5.0 (Linux; U; Android 2.2; fr-fr; Desire_A8181 Build/FRF91) App3leWebKit/53.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',10);
		this.addUserAgent('GoogleBot','Googlebot/2.1 ( http://www.googlebot.com/bot.html) ',10);
		this.addUserAgent('Baiduspider','Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',10);
	},
*/
	//----------------------------割开，公用方法--------------------------------------
	/**
		queryDomains 			查询所有有资料的域名
		queryDomain 			按根据域名ID查询域名
		queryUserAgents 		查询所有UserAgent
		queryUserAgentByDomain	查询域名指定的UserAgent
		queryCookieByDomain		查询指定域名的Cookie设置
	**/
	queryDomains:function(success,fail){
		this._db.transaction(
			function(tx){
				tx.executeSql('SELECT * FROM Domain',[],success,fail);
			}
		);
	},
	queryDomain:function(did){
		this._db.transaction(
			function(tx){
				tx.executeSql('SELECT * FROM UserAgent ORDER BY level desc',[],success,fail);
			}
		);
		
	},
	queryUserAgents:function(success,fail){
		var sql='SELECT * FROM UserAgent ORDER BY level desc';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[],success,fail);
			}
		);
		
	},
	addUserAgent:function(name,uastring,level,success,fail){
		var sql='INSERT INTO UserAgent (name,uastring,level) VALUES (?,?,?)';
		var fn=this.queryUserAgentByDomain;
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[name,uastring,level],fn,fn);
			}
		);


	},
	queryUserAgentByDomain:function(domain,e){
		console.log(e);
		
	},
	queryCookieByDomain:function(domain){

	}
}