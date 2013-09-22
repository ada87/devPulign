/**
*	参数页面，设置参数相关
*/
;var Tab = function(c,v){
	this._init(c,v);
}
Tab.prototype = {
	controls:null,
	views:null,
	_init:function(c,v){
		this.controls = $(c).children();
		this.views = $(v).children();
		for(var i=0,j=this.controls.length;i<j;i++){
			this.bindClick(this.controls[i],i);
		}
	},
	bindClick:function(el,index){
		var control=this.controls;
		var view = this.views;
		var switchTab=function(){
			for(var i=0,j=control.length;i<j;i++){
				$(control[i]).removeClass('selected');
				$(view[i]).hide();
			}
			$(control[index]).addClass('selected');
			$(view[index]).show();
		}
		$(el).click(switchTab);
	}

};

var Options = function(){
	this._init();
}
Options.prototype={
	db : null,
	tab : null,
	c_domain:null,
	_init:function(){
		this.db = new DataBase();
		this.tab = new Tab('#c','#v');
		$('#addua').click(this.addua);
		this.db.queryUserAgents(this.queryUserAgents);

		$('#adddomain').click(this.adddomain);
		$('#deldomain').click(this.deldomain);
		this.refulshDomainPanel();
	},
	adddomain:function(){
		var domainname = $('#domainname').val();
		if(domainname==''){
			alert('请输入域名');
			return;
		}
		option.db.addDomain(domainname,option.exedomainresult,option.exedomainresult);
	},
	deldomain:function(){
		var domainid = $('#selectdomain').val();
		option.db.delDomain(domainid,option.exedomainresult,option.exedomainresult);
	},
	exedomainresult:function(tx,result){
		if(result.rowsAffected){
			alert('操作成功');
			option.refulshDomainPanel();
		}else{
			alert('操作失败');
		}
	},
	queryDomains:function(tx,result){
        var size=result.rows.length;
        var selDomain = document.getElementById('selectdomain');
        selDomain.options.length = 0;
        for(var i=0,j=result.rows.length;i<size;i++){
            var data=result.rows.item(i);
        	selDomain.options.add(new Option(data.domain,data.did));
        }
	},
	refulshDomainPanel:function(){
		this.db.queryDomains(this.queryDomains);
	},
	queryUserAgents:function(tx,result){
		var html='';
        var size=result.rows.length;
        for(var i=0;i<size;i++){
            var data=result.rows.item(i);
            html+='<div class="uaitem">';
            html+='	<div class="uname">'+data.name+'</div>'
            html+='	<div class="ustr">'+data.uastring+'</div>'
            html+='	<div class="ulevel">'+data.level+'</div>'
            html+='	<div id="'+data.uid+'" class="udel">删除</div>'
            html+='</div>';
        }
        $('#uatable').html(html);
        $('.udel').click(option.delua);
	},
	addua:function(){
		var name=$('#uname').val();
		var str=$('#ustr').val();
		var level=$('#ulevel').val();
		if(name==''){
			alert('名称不能为空');
			return;
		}
		if(str==''){
			alert('User-Agent 字符串不能为空');
			return;
		}
		if(level==''||isNaN(level)){
			alert('级别不能为空，且必须为数字');
			return;
		}
		option.db.addUserAgent(name,str,level,option.adduaresult,option.adduaresult);
	},
	adduaresult:function(tx,result){
		if(result.rowsAffected){
			alert('User-Agent 添加成功');
			option.db.queryUserAgents(option.queryUserAgents);
		}else{
			alert('User-Agent 添加失败');
		}
	},
	delua:function(evt){
		var uid = evt.currentTarget.id;
		option.db.delUserAgent(uid,option.deluaresult,option.deluaresult);
	},
	deluaresult:function(tx,result){
		if(result.rowsAffected){
			alert('User-Agent 删除成功');
			option.db.queryUserAgents(option.queryUserAgents);
		}
	}

}



var option = null;
$(document).ready(
	function(){
		option = new Options();
	}
);