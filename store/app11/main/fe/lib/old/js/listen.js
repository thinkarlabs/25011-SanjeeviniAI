//Bengali - bn-IN, Gujarati - gu-IN, Kannada - kn-IN, Malayalam - ml-IN, Marathi - mr-IN, Tamil - ta-IN, Telugu - te-IN, Urdu - ur-IN, Hindi - hi-IN

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;

if (session_info.curr.device == 'mob'){
	isMobile = true;
}else{
	isMobile = false;	
}

function initSpeech(){
  if (!('webkitSpeechRecognition' in window)) {
    console.log('Speech Recognition not supported by browser.');
  } else {
    //showInfo('start');  
    //start_button.style.display = 'inline-block';
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
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
      //showInfo('stop');
    };

    recognition.onresult = function(event) {
		
	  if (recognizing === false) return;
		  
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
	  
      final_span.innerHTML += finalTranscripts;
      interim_span.innerHTML = interimTranscripts;
	  
	}
  }	
}

function start_listening(){
	stop_listening();
	final_transcript = '';
	recognition.lang = $('#listen_lang').val()
	recognition.start();
	ignore_onend = false;	
}

function stop_listening(){
  if (recognizing) {
	recognizing = false;
	recognition.stop();
	return;
  }
}