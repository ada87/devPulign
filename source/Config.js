var Config = {
	UA:{
		ID:'ID',
		NAME:'NAME',
		UASTR:'UASTR'
	},
	set:function(key,value){
		localStorage.setItem(key,value);
	},
	get:function(key){
		if(localStorage[key]){
			return localStorage.getItem(key);
		}else{
			return '';
		}
	},
	remove:function(key){
		localStorage.removeItem(key);
	}
}