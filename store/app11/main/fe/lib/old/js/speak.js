//Bengali - bn-IN, Gujarati - gu-IN, Kannada - kn-IN, Malayalam - ml-IN, Marathi - mr-IN, Tamil - ta-IN, Telugu - te-IN, Urdu - ur-IN, Hindi - hi-IN

var synth = window.speechSynthesis;
speechSynthesis.onvoiceschanged = popVoices
//var speech_textEN = ''; var speech_textKN = '';
var my_voices = [];

function popVoices(){
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

function set_voice(obj,lang){
	//$('#speak_lang').val('Microsoft Heera - English (India)');
	if (lang == 'en-IN') sel_voice = 'Microsoft Neerja Online (Natural) - English (India) (Preview)'
	if (lang == 'kn-IN') sel_voice = 'Microsoft Gagan Online (Natural) - Kannada (India)'
	if (lang == 'ta-IN') sel_voice = 'Microsoft Pallavi Online (Natural) - Tamil (India)'
	if (lang == 'hi-IN') sel_voice = 'Microsoft Madhur Online (Natural) - Hindi (India)'
	obj.val(sel_voice)
	
	//To decide behaviour on Chrome/Safari and Android Chrome/Edge and Edge on Ubuntu.
	//If the obj is still empty, set it to the 1st available voice.
}

function start_speech(){
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
	
	for (let i = 0; i < my_voices.length; i++) {
	  if (my_voices[i].name === selectedOption) {
		utterThis.voice = my_voices[i];
	  }
	}	
	utterThis.rate = $('#rate').val();
	utterThis.volume = 1;

	console.log(utterThis.voice);
	//console.log(utterThis.text);
	synth.speak(utterThis);		
    
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

function reset_speech(){
	$('#btnSpeak').text('Speak'); 
	//translate_text();
	if (synth.speaking) {
		//console.error("speechSynthesis.speaking");
		//return;
		synth.cancel();
	}
}

function change_lang(){
	speechSynthesis.onvoiceschanged = null;
	reset_speech();	
	translate_text();
}