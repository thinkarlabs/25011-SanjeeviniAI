_cp = _app.curr_page
_cp.init = function() {
  _cp.views.page = './fe/app11/web/login.htm';
  
	//
	//_app.curr_ses.ten.org
	//_app.curr_ses.ten.app
	
	//Render the page.
	_cp.render_page(_cp.views.page,'');	
	//Bind events for login. 
	_app.bind_event('#btnLogin','click',_cp.on.Login);
}

_cp.on.Login = function(){
	_app.nav_page('store.location_lst');
	return false;
}

_cp.init();




