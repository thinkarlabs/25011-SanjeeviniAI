//Bengali - bn-IN, Gujarati - gu-IN, Kannada - kn-IN, Malayalam - ml-IN, Marathi - mr-IN, Tamil - ta-IN, Telugu - te-IN, Urdu - ur-IN, Hindi - hi-IN

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
var isListening;
var mob_text = '';

_cp.on.initSpeech = function(){
  if (!('webkitSpeechRecognition' in window)) {
    console.log('Speech Recognition not supported by browser.');
  } else {
    //showInfo('start');  
    //start_button.style.display = 'inline-block';
    recognition = new webkitSpeechRecognition();
	mob_text = "";
	
	if (isMobile){
		recognition.continuous = false;
	}
	else{
		recognition.continuous = true;		
	}
	
    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
      //showInfo('speak_now');
      //start_img.src = 'images/mic-animation.gif';
    };

    recognition.onerror = function(event) {
      if (event.error == 'no-speech') {
        //start_img.src = 'images/mic.gif';
        //showInfo('no_speech');
        ignore_onend = true;
      }
      if (event.error == 'audio-capture') {
        //start_img.src = 'images/mic.gif';
        //showInfo('no_microphone');
        ignore_onend = true;
      }
      if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
          //showInfo('blocked');
        } else {
          //showInfo('denied');
        }
        ignore_onend = true;
      }
    };

    recognition.onend = function() {
		if (isMobile){
			if (isListening === true){
				mob_text = final_span.innerHTML;
				recognition.start();
			}
		}
		else{
		  recognizing = false;	
		  if ($('#btnListen').text() === 'Pause'){
			$('#btnListen').text('Continue');
		  }
		  if (ignore_onend) {
			return;
		  }
		  //start_img.src = 'images/mic.gif';
		  if (!final_transcript) {
			//showInfo('start');
			return;
		  }
		}
    };

    recognition.onresult = function(event) {
		
	  //If this event is fired, then it is recognizing (irrespective of whether it should or not)
	  recognizing = true;
	
	  var interimTranscripts = '';
	  var finalTranscripts = '';
	  for(var i = event.resultIndex; i < event.results.length; i++){
		var transcript = event.results[i][0].transcript;
		if(event.results[i].isFinal){
		  if(isMobile){  //if running on a mobile device
			finalTranscripts = transcript;
		  }else{
			finalTranscripts += transcript;
		  }
		}else{
		  if(isMobile){  //if running on a mobile device
			interimTranscripts = transcript;
		  }else{
			interimTranscripts += transcript;
		  }
		}
	  }
	  
	if (isMobile){
	  final_span.innerHTML = mob_text + finalTranscripts;;
	}
	else{
	  final_span.innerHTML += finalTranscripts;		
	}
      interim_span.innerHTML = interimTranscripts;
	  
	}
  }	
}

_cp.on.start_listening = function(){
	_cp.on.stop_listening();
	final_transcript = '';
	recognition.lang = $('#listen_lang').val()
	recognition.start();
	ignore_onend = false;
	isListening = true;
}

_cp.on.stop_listening = function(){
  if (recognizing) {
	recognizing = false;
	recognition.stop();
	isListening = false;
	return;
  }
}