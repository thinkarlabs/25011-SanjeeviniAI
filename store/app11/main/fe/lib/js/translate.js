speech_langs = ["en","kn","hi","ta"];
var speech_text = [];

curr_lang = 'en'
sel_lang = 'en'

_cp.on.get_sel_lang = function(){
	if ($("#speak_lang").val() === null){
		return 'en';
	}
	
	if ($("#speak_lang").val().indexOf('Kannada') > 0) _lang = 'kn';
	else if ($("#speak_lang").val().indexOf('Hindi') > 0) _lang = 'hi';
	else if ($("#speak_lang").val().indexOf('Tamil') > 0) _lang = 'ta';
	else _lang = 'en';

	return _lang;
}

_cp.on.get_input_lang = function(){
	if ($("#listen_lang").val().indexOf('Kannada') > 0) _lang = 'kn';
	else if ($("#listen_lang").val().indexOf('Hindi') > 0) _lang = 'hi';
	else if ($("#listen_lang").val().indexOf('Tamil') > 0) _lang = 'ta';
	else _lang = 'en';

	return _lang;
}

_cp.on.translate_text = function() {
	_cp.on.translate_text2(false);
}

_cp.on.translate_text2 = function(speak) {
	sel_lang = _cp.on.get_sel_lang();

	//alert(sel_lang);
	//if (sel_lang === 'en'){
	//	$('#speak_text').text(speech_text[sel_lang]);
	//	curr_lang = sel_lang;
	//	return;
	//}

	if (speech_text[sel_lang] === '' || speech_text[sel_lang] === undefined){
		j_dat = {from_lang: 'en', to_lang: sel_lang, txt_body : speech_text['en']}
		//alert(j_dat);
		
		$.ajax({
		   url: "/app04/api/mod03/convs/translate", 
		   type: "POST",
		   dataType: "json",
		   contentType: "application/json; charset=utf-8",
		   data: JSON.stringify(j_dat),
		   success: function (result) {
			   console.log(result);
			   speech_text[sel_lang] = result;
			   $('#speak_text').text(speech_text[sel_lang]);
			   curr_lang = sel_lang;
			   //speak_text(speech_textKN);
			   if (speak) _cp.on.bot_on_speak();
			},
			error: function (err) {
			// check the err for error details
			}
		}); // ajax call closing				
	}
	else{
		sel_lang = 'en';
		$('#speak_text').text(speech_text[sel_lang]);
		curr_lang = sel_lang;		
		if (speak) _cp.on.bot_on_speak();
	}
}
