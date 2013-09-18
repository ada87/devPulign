/**
*	参数页面，设置参数相关
*/
;
var Options = function(){
	this._init();
}
Options.prototype={
	db : null,

	_init:function(){
		this.db = new DataBase();
		this._eventListener();
		this.db.queryDomains(this.queryDomains);
	},
	_eventListener : function(){
		
	},
	queryDomains:function(tx,result){
        var size=result.rows.length;
        for(var i=0;i<size;i++){
            var data=result.rows.item(i);
            console.log(data.did);
            console.log(data.domain);
            console.log(data.useragent);
            console.log(data.cookie);
        }

	}

}

var option = null;
$(document).ready(
	function(){
		option = new Options();
	}
);


















$(document).ready(
	function(){new Options()}
);