const _app = new RubixCore();
_app.init();
_app.debug = true;
_app.curr_ses = JSON.parse(sessionStorage.getItem('session_info'));



// _app.msg("Hii SanjeeviniAI")
function launch(pg,win){	
	if (win === 'web'){
		p = window.open(pg,'_self','fullscreen=yes');
		p.focus();
	}
	
	// if (win === 'mob'){
		// p=window.open(pg,'ThinkarMobile','popup=yes');
		// p.focus();
		// p.resizeTo(400,650);
		// p.moveTo(500,40);		
	// }
	// if (win === 'tab'){
		
		// p = window.open(pg,'ThinkarTab','popup=yes,left=40,top=40,width=1280,height=820');
		// p.focus();
	// }
}


_cp = _app.load_page('store.usr_login','')
// _cp = _app.load_page('store.location_lst','')

history.replaceState({}, null, "/app11/");



