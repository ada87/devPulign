
/*数据库获取，初始化*/
;var DB={
	name:'xd_devtools',
	version:'1.0',
	display:'xd_devtools database',
	size:50*1024*1024,
	db:null,
	getDB:function(){
		if(DB.db==null){
			DB.db=window.openDatabase(DB.name,DB.version,DB.display,DB.size);
		}
		return DB.db;
	},
	status:0,
	totalstatus:6,
	msg:'',
	DBSUCCESS:function(){
		DB.status+=1;
	},
	DBERROR:function(tx,error){
		DB.msg+=error;
	},
	initDataBase:function(){
		var db=DB.getDB();
		db.transaction(function(tx){tx.executeSql(SQL.DROPALL,[],DB.DBSUCCESS,DB.DBERROR);});
		db.transaction(function(tx){tx.executeSql(SQL.USER_AGENTS,[],DB.DBSUCCESS,DB.DBERROR);});
		db.transaction(function(tx){tx.executeSql(SQL.USER_AGENT_DOMAIN,[],DB.DBSUCCESS,DB.DBERROR);});
		db.transaction(function(tx){tx.executeSql(SQL.COOKIES,[],DB.DBSUCCESS,DB.DBERROR);});
		db.transaction(function(tx){tx.executeSql(SQL.COOKIE_VALUE,[],DB.DBSUCCESS,DB.DBERROR);});
		db.transaction(function(tx){tx.executeSql(SQL.DOMAIN,[],DB.DBSUCCESS,DB.DBERROR);});
		if(DB.status!=DB.totalstatus&& DB.msg!=''){
			alert(msg);
		}
	}
}

//只在安装时运行
chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason=='install'){
		DB.initDataBase();
	}else if(details.reason=='update'){
	}else if(details.reason=='chrome_update'){
	}
}
);

//一期只实现UA COOKIE
var SQL={
	DROPALL:" DROP TABLE IF EXISTS UserAgent;"					//删除所有表
			+ " DROP TABLE IF EXISTS UserAgent_Domain;"
			+ " DROP TABLE IF EXISTS Cookie;"
			+ " DROP TABLE IF EXISTS Cookie_Value;"
			+ " DROP TABLE IF EXISTS JavaScript;"
			+ " DROP TABLE IF EXISTS PageEvent;"
			+ " DROP TABLE IF EXISTS Ajax;"
			+ " DROP TABLE IF EXISTS Domain;"

	,USER_AGENTS : 'CREATE TABLE IF NOT EXISTS UserAgent'			//表-UserAgent 	浏览器UA库
			+'( uid INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	name TEXT,'										//名称 比如 IE6,iPad，chrome
			+'	uastring TEXT, '								//对应UA字符串
			+'	level INTEGER, '								//级别
			+'	UNIQUE (name,uastring) ON CONFLICT REPLACE )'

	,USER_AGENT_DOMAIN : 'CREATE TABLE IF NOT EXISTS UserAgent_Domain'	//表- UserAgent_Domain 浏览器UA指定域名
			+'( udid INTEGER PRIMARY KEY AUTOINCREMENT,'		//id
			+'	uid INTEGER REFERENCES UserAgent (uid) ,'		//外键 UA的ID
			+'	domain TEXT ,'									//作用的域名
			+'	status INTEGER )'								//状态 0=失效 1=生效

	,COOKIES : 'CREATE TABLE IF NOT EXISTS Cookie'						//表 Cookie 规则表
			+'( cid INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	name TEXT ,'									//cookie 名称
			+'	domain TEXT ,'									//cookie生效的域名
			+'	type INTEGER ,'									//cookie的类型 1 = SWITCH 切换型，比如登录用户切换。2 = STATUS 状态型，比如判断字段
			+'	exprie INTEGER )'								//过期时间 0 = SESSION 会话过期 N = N (ms)后过期

	,COOKIE_VALUE: 'CREATE TABLE IF NOT EXISTS Cookie_Value'			//表 Cookie 取值表
			+'( cvid INTEGER PRIMARY KEY AUTOINCREMENT,'		//id
			+'	cid INTEGER  REFERENCES Cookie (cid) ,'		//cookie id 外键
			+'	value TEXT ,'									//cookie值
			+'	status INTEGER ,'								//cookie的类型 1 = SWITCH 切换型，比如登录用户切换。2 = STATUS 状态型，比如判断字段
			+'	exprie INTEGER )'								//过期时间 0 = SESSION 会话过期 N = N (ms)后过期
	
	,DOMAIN: 'CREATE TABLE IF NOT EXISTS Domain'						//表 DOMAIN 域名缓存表
			+'( did INTEGER PRIMARY KEY AUTOINCREMENT,'			//id
			+'	domain TEXT,'									//域名
			+'	useragent INTEGER ,'							//UserAgent 	配置数量
			+'	cookie INTEGER ,'								//Cookie 		配置数量
			+'	javascript INTEGER ,'							//JavaScript 	配置数量
			+'	pageevent INTEGER ,'							//PageEvent 	配置数量
			+'	ajax INTEGER )'									//Ajax 			配置数量

}


/**

#DOMAIN管理(用于OPTIONS,自动记录有记录的DOMAINH)
CREATE TABLE DOMAINS (
	D_ID INT ,				#1 AUTO
	D_DOMAIN VARCHAR 	#CAIYUN.FEIXIN.10086.CN
	D_UA INT,
	D_COOKIE INT,
	D_SCRIPT INT,
	D_EVENT INT,
	D_AJAX INT
)

#脚本管理
CREATE TABLE JAVASCRIPTS (
	J_ID INT ,				#1 AUTO
	J_CODE TEXT,			#ALERT(1)
	J_PAGEURL					#HTTP://CAIYUN.FEIXIN.10086.CN/INDEX.JSP
	J_RUNTIME INT			#-1=DISABLE,0=ONLOAD,N=AFTER LOAD N(S)
)

#EVENT管理
CREATE TABLE PAGEEVENTS (
	P_ID INT ,				#1 AUTO
	P_TYPE VARCHAR,		#CLICK
	P_SOURCE VARCHAR,	#ID/CLASS=ABC
	P_PAGEURL VARCHAR,#HTTP://CAIYUN.FEIXIN.10086.CN/INDEX.JSP
	P_status INT 			#0=DISABLE,1=ENABLE
)

#AJAX管理
CREATE TABLE AJAXS (
	A_ID INT ,				#1 AUTO
	A_VISIT VARCHAR 	#/TT.ACTION
	A_DOMAIM VARCAHR	#CAIYUN.FEIXIN.10086.CN
	A_status	INT				#0=DISABLE,1=ENABLE
)



**/