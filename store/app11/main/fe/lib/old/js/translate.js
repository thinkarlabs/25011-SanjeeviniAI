speech_langs = ["en","kn","hi","ta"];
var speech_text = [];

curr_lang = 'en'
sel_lang = 'en'

function get_sel_lang(){
	if ($("#speak_lang").val().indexOf('Kannada') > 0) _lang = 'kn';
	else if ($("#speak_lang").val().indexOf('Hindi') > 0) _lang = 'hi';
	else if ($("#speak_lang").val().indexOf('Tamil') > 0) _lang = 'ta';
	else _lang = 'en';

	return _lang;
}

function get_input_lang(){
	if ($("#listen_lang").val().indexOf('Kannada') > 0) _lang = 'kn';
	else if ($("#listen_lang").val().indexOf('Hindi') > 0) _lang = 'hi';
	else if ($("#listen_lang").val().indexOf('Tamil') > 0) _lang = 'ta';
	else _lang = 'en';

	return _lang;
}

function translate_text() {
	translate_text2(false);
}

function translate_text2(speak) {
	sel_lang = get_sel_lang();
	//alert(sel_lang);
	//if (sel_lang === 'en'){
	//	$('#speak_text').text(speech_text[sel_lang]);
	//	curr_lang = sel_lang;
	//	return;
	//}

	if (speech_text[sel_lang] === '' || speech_text[sel_lang] === undefined){
		j_dat = {from_lang: 'en', to_lang: sel_lang, txt_body : speech_text['en']}
		console.log(j_dat);
		
		$.ajax({
		   url: "/app04/api/student/topics/translate", 
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
			   if (speak) bot_on_speak();
			},
			error: function (err) {
			// check the err for error details
			}
		}); // ajax call closing				
	}
	else{
		$('#speak_text').text(speech_text[sel_lang]);
		curr_lang = sel_lang;		
		if (speak) bot_on_speak();
	}
}
