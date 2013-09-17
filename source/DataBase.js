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