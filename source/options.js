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
		this.db.queryDomains(this.queryDomains);
		this._eventListener();
	},
	_eventListener : function(){
		$('.uam').click(function(){
		});
	},
	switchPanel : function(panel){
		
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





















$(document).ready(
	function(){new Options()}
);