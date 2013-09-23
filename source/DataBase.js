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
		}
		var self=this;
		this._db.transaction(function(tx){tx.executeSql('SELECT * FROM UserAgent',null,null,function(){self._initDataBase()});});
	},
	_initDataBase:function(){
		this._db.transaction(function(tx){tx.executeSql(SQL.DROP.UserAgent);});
		this._db.transaction(function(tx){tx.executeSql(SQL.DROP.Cookie_Value);});
		this._db.transaction(function(tx){tx.executeSql(SQL.DROP.Cookie);});
		this._db.transaction(function(tx){tx.executeSql(SQL.DROP.Domain);});

		this._db.transaction(function(tx){tx.executeSql(SQL.USER_AGENTS)});
		this._db.transaction(function(tx){tx.executeSql(SQL.DOMAIN);});
		this._db.transaction(function(tx){tx.executeSql(SQL.COOKIES);});
		this._db.transaction(function(tx){tx.executeSql(SQL.COOKIE_VALUE);});
		this.addUserAgent('IE10(WinPhone Nokia920)','Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',3);
		this.addUserAgent('IE10','Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0; Touch)',10);
		this.addUserAgent('IE9','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)',10);
		this.addUserAgent('IE8','Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; BTRS124307)',10);
		this.addUserAgent('IE7','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)',10);
		this.addUserAgent('IE6','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)',10);
		this.addUserAgent('FireFox18','Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',9);
		this.addUserAgent('Chrome29','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36',9);
		this.addUserAgent('SAMSUNG GALAXY TAB','Mozilla/5.0 (Linux; U; Android 2.2; en2; SAMSUNG GT-P1000 Tablet Build/MASTER) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',4);
		this.addUserAgent('iPad','Mozilla/5.0 (iPad; CPU OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B141 Safari/8536.25',4);
		this.addUserAgent('iPhone','Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B143 Safari/8536.25',4);
		this.addUserAgent('Google nexus','Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',4);
		this.addUserAgent('Xbox','Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Xbox)',2);
		this.addUserAgent('Opera9','Opera/9.80 (Windows NT 5.1; U; en) Presto/2.10.289 Version/12.01',9);
		this.addUserAgent('HTC Desire','Mozilla/5.0 (Linux; U; Android 2.2; fr-fr; Desire_A8181 Build/FRF91) App3leWebKit/53.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',4);
		this.addUserAgent('GoogleBot','Googlebot/2.1 ( http://www.googlebot.com/bot.html) ',1);
		this.addUserAgent('Baiduspider','Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',1);
		this.addDomain('caiyun.feixin.10086.cn');
		//name,did,type,exprie,reflush
		this.addCookie('.roteserver','1','2','0','1');
		this.addCookie('.mssc','1','1','0','1');
		this.addCookieValue('1','现网环境','1');
		this.addCookieValue('1','灰度环境','2');
		this.addCookieValue('1','体验环境1号','3');
		this.addCookieValue('1','体验环境2号','4');


	},
	//----------------------------割开，公用方法--------------------------------------
	/**
		queryDomains 			查询所有有资料的域名
		queryUserAgents 		查询所有UserAgent
		queryCookieByDomain		查询指定域名的Cookie设置
	**/
	queryDomains:function(success,fail){
		this._db.transaction(
			function(tx){
				tx.executeSql('SELECT * FROM Domain',[],success,fail);
			}
		);
	},
	addDomain:function(name,success,fail){
		var sql='INSERT INTO Domain (domain) VALUES (?)';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[name],success,fail);
			}
		);
	},
	delDomain:function(did,success,fail){
		var sql='DELETE FROM Domain WHERE did=?'
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[did],success,fail);
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
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[name,uastring,level],success,fail);
			}
		);
	},
	delUserAgent:function(id,success,fail){
		var sql='DELETE FROM UserAgent WHERE uid=?';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[id],success,fail);
			}
		);
	},
	queryCookieByDomainID:function(did,success,fail){
		var sql='SELECT * FROM Cookie WHERE did = ?';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[did],success,fail);
			}
		);
	},
	queryCookieByDomainName:function(domain,success,fail){
		var sql='SELECT * FROM Cookie WHERE did = (SELECT did FROM Domain WHERE domain = ?)';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[domain],success,fail);
			}
		);
	},
	addCookie:function(name,did,type,exprie,reflush,success,fail){
		var sql='INSERT INTO Cookie (name,did,type,exprie,reflush) VALUES (?,?,?,?,?)';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[name,did,type,exprie,reflush],success,fail);
			}
		);
	},
	delCookie:function(cid,success,fail){
		var sql='DELETE FROM Cookie_Value WHERE cid=?;'
				+'DELETE FROM Cookie WHERE cid=?';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[cid,cid],success,fail);
			}
		);
	},
	queryCookieValue:function(cid,success,fail){
		var sql='SELECT * FROM Cookie_Value WHERE cid = ?';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[cid],success,fail);
			}
		);
	},
	addCookieValue:function(cid,sname,value,success,fail){
		var sql='INSERT INTO Cookie_Value (cid,sname,value) VALUES (?,?,?)';
		this._db.transaction(
			function(tx){
				tx.executeSql(sql,[cid,sname,value],success,fail);
			}
		);
	},
	delCookieValue:function(cvid,success,fail){
		this._db.transaction(function(tx){tx.executeSql('DELETE FROM Cookie_Value WHERE cvid=?;',[cvid],success,fail);});
	}
}



//一期只实现UA COOKIE
var SQL={
	DROP:{UserAgent:'DROP TABLE IF EXISTS UserAgent;'					//删除所有表
			,Cookie_Value:'DROP TABLE IF EXISTS Cookie_Value;'
			,Cookie:'DROP TABLE IF EXISTS Cookie;'
			,Domain:'DROP TABLE IF EXISTS Domain;'}

	,DOMAIN: 'CREATE TABLE IF NOT EXISTS Domain'				//表 DOMAIN 域名缓存表
			+'( did INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	domain TEXT); '									//域名

	,USER_AGENTS : 'CREATE TABLE IF NOT EXISTS UserAgent'			//表-UserAgent 	浏览器UA库
			+'( uid INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	name TEXT,'										//名称 比如 IE6,iPad，chrome
			+'	uastring TEXT, '								//对应UA字符串
			+'	level INTEGER, '								//级别
			+'	UNIQUE (name,uastring) ON CONFLICT REPLACE );'

	,COOKIES : 'CREATE TABLE IF NOT EXISTS Cookie'						//表 Cookie 规则表
			+'( cid INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	name TEXT ,'									//cookie 名称
			+'	did INTEGER REFERENCES DOMAIN (cid),'			//cookie生效的域名
			+'	type INTEGER ,'									//cookie的类型 1 = SWITCH 切换型，比如登录用户切换。2 = STATUS 状态型，比如判断字段
			+'	exprie INTEGER, '								//过期时间 0 = SESSION 会话过期 N = N (ms)后过期
			+'	reflush INTEGER); '								//切换时是否强制刷新 0 = 不刷新 1 = 刷新


	,COOKIE_VALUE: 'CREATE TABLE IF NOT EXISTS Cookie_Value'			//表 Cookie 取值表
			+'( cvid INTEGER PRIMARY KEY AUTOINCREMENT,'		//id
			+'	cid INTEGER  REFERENCES Cookie (cid) ,'			//cookie id 外键
			+'	sname TEXT ,'									//cookie值
			+'	value TEXT );'									//cookie的类型 1 = SWITCH 切换型，比如登录用户切换。2 = STATUS 状态型，比如判断字段
}
