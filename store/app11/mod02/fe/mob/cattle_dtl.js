_cp = _app.curr_page
console.log('good afternoon')

_cp.init = function(){
    _cp.views.page = './app11/fe/mod02/mob/cattle_dtl.htm';	
	_cp.api.item = '/app03/api/mod01/anganwadi/';
	
	//If params then it is in EDIT mode. Else Add mode.
	if (_cp.params !== ''){
		_app.get(_cp.api.item + _cp.params, function(item_data){
			_cp.render_page(_cp.views.page,item_data);
			_cp.load();					
		});
	}
	else{
		_cp.render_page(_cp.views.page,'');		
		_cp.load();	
	}	
}

//FILTER
_cp.load = function(){
	_app.bind_event('#btnCancel','click',_cp.on.Cancel);
	_app.bind_event('#btnSave','click',_cp.on.Save);
}

//CANCEL
_cp.on.Cancel = function(){
	_app.nav_page('mob.cattle_lst');
	return false;
}

//SAVE
_cp.on.Save = function(){
	
	_app.nav_page('mob.cattle_lst');
	return false;
}


_cp.init();

