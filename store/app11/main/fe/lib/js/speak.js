//Bengali - bn-IN, Gujarati - gu-IN, Kannada - kn-IN, Malayalam - ml-IN, Marathi - mr-IN, Tamil - ta-IN, Telugu - te-IN, Urdu - ur-IN, Hindi - hi-IN

var synth = window.speechSynthesis;
speechSynthesis.onvoiceschanged = _cp.on.popVoices
//var speech_textEN = ''; var speech_textKN = '';
var my_voices = [];

_cp.on.popVoices = function(){
	supLang = ["en-IN", "kn-IN", "hi-IN","ta-IN", "en_IN", "kn_IN", "hi_IN","ta_IN"];
	//supLang = ["en-IN", "kn-IN","ta-IN","hi-IN", "en_IN", "kn_IN","ta_IN","hi_IN"];
	console.log('My voices : ' + my_voices.length);
	if (my_voices.length === 0){		
		voices = synth.getVoices();
		console.log('Loading :' + voices.length);
		$("#speak_lang").empty();
		for (let i = 0; i < voices.length; i++) {
			if (supLang.includes(voices[i].lang)) {
				console.log('Filtered : voice : ' + voices[i].name + '|' + voices[i].lang);
				my_voices.push(voices[i]);
				$("#speak_lang").append($("<option />").val(voices[i].name).text(voices[i].name));
			}
		}

		//$('#speak_lang').val('Microsoft Heera - English (India)');
	}
	else{
		//Load from already loaded voices!!!
		$("#speak_lang").empty();
		for (let i = 0; i < my_voices.length; i++) {
			if (supLang.includes(my_voices[i].lang)) {
				console.log('Cached : voice : ' + my_voices[i].name + '|' + my_voices[i].lang);				
				$("#speak_lang").append($("<option />").val(my_voices[i].name).text(my_voices[i].name));
			}
		}
		
	}
	console.log('Done');
	speechSynthesis.onvoiceschanged = null;
}

_cp.on.set_voice = function(obj,lang){
	//$('#speak_lang').val('Microsoft Heera - English (India)');
	if (lang == 'en-IN') sel_voice = 'Microsoft Neerja Online (Natural) - English (India) (Preview)'
	if (lang == 'kn-IN') sel_voice = 'Microsoft Gagan Online (Natural) - Kannada (India)'
	if (lang == 'ta-IN') sel_voice = 'Microsoft Pallavi Online (Natural) - Tamil (India)'
	if (lang == 'hi-IN') sel_voice = 'Microsoft Madhur Online (Natural) - Hindi (India)'
	obj.val(sel_voice)
	
	//To decide behaviour on Chrome/Safari and Android Chrome/Edge and Edge on Ubuntu.
	//If the obj is still empty, set it to the 1st available voice.
}

_cp.on.start_speech = function(){
  //alert('Starting Speech');
  if ($('#btnSpeak').text() === 'Speak'){
	$('#btnSpeak').text('Pause');
	if (synth.speaking) {
		//console.error("speechSynthesis.speaking");
		//return;
		synth.cancel();
	}
	
	const selectedOption = $("#speak_lang").val();
	var stxt = $('#speak_text').text()
	console.log(stxt);

	const utterThis = new SpeechSynthesisUtterance(stxt);

	utterThis.onend = function (event) {
	  console.log("SpeechSynthesisUtterance.onend");
	  $('#btnSpeak').text('Speak'); 
	};

	utterThis.onerror = function (event) {
	  //console.error("SpeechSynthesisUtterance.onerror");
	  console.error(event.error);
	};
	
	if (!isMobile){
		var _sel_voice = null;
		console.log('Setting voice for desktop voices');
		for (let i = 0; i < my_voices.length; i++) {
		  if (my_voices[i].name === selectedOption) {
			utterThis.voice = my_voices[i];
		  }
		}	

		if (_sel_voice === null ){
			const voices = speechSynthesis.getVoices().filter(voice => voice.lang === $("#listen_lang").val());
			if (voices[0] !== undefined) {
				_sel_voice = voices[0]
			}			
		}

		if (_sel_voice === null ) {alert('No voice support');return;}
		utterThis.voice = _sel_voice;
		//
		//console.log(utterThis.voice);
		//utterThis.rate = $('#rate').val();		
	}	

	/*
	for (let i = 0; i < my_voices.length; i++) {
	  if (my_voices[i].name === selectedOption) {
		utterThis.voice = my_voices[i];
	  }
	}	
	*/
	
	utterThis.rate = $('#rate').val();		
	utterThis.volume = 1;

	//alert(utterThis);
	//console.log(utterThis.text);
	synth.speak(utterThis);	
	console.log('Called speak with utterThis.');

  }
  else if ($('#btnSpeak').text() === 'Continue') {
	$('#btnSpeak').text('Pause'); 
	synth.resume();  
  }
  else{
	synth.pause();
	$('#btnSpeak').text('Continue');  
  }
}

_cp.on.reset_speech = function(){
	$('#btnSpeak').text('Speak'); 
	//translate_text();
	if (synth.speaking || synth.paused) {
		//console.error("speechSynthesis.speaking");
		//return;
		synth.cancel();
	}	
}

_cp.on.change_lang = function(){
	speechSynthesis.onvoiceschanged = null;
	_cp.on.reset_speech();	
	_cp.on.translate_text();
}