/*
quiz_on_start
quiz_on_ask
quiz_on_answer
quiz_on_submit
quiz_on_eval
quiz_on_next
*/

_cp.on.showQnA = function(){
	_cp.on.go('v');
	//alert('QnAing3');
	qna_url = `
		<div class="my-2">
			<div class="btn-group" role="group" aria-label="Basic example">
			<button type="button" class="btn btn-primary" id="btnStart">Start Quiz</button>
			  <select id="quiz_len" class="form-select ms-2" style="width:120px" onchange="setQLen();">
				<option value="3" selected>Small</option>
				<option value="7">Medium</option>
				<option value="12">Long</option>
			  </select>
			  <h6 id="lbl_pos" class="ms-2 mt-2"> 0 / 3</h6>
			</div>
			<div class="btn-group float-end" role="group" aria-label="Basic example">
				<div class="btn-group float-end" role="group" aria-label="Basic example">
				  <select id="listen_lang" class="form-select me-2" style="width:160px">
					<option value="en-IN" selected>English-India</option>
					<option value="kn-IN">Kannada-India</option>
				  </select>
				
				  <select id="speak_lang" style="max-width:220px" class="form-select">

				  </select>
				</div>
				<button type="button" class="btn btn-primary ms-2" id="btnSpeak">Speak</button>
				<button type="button" class="btn btn-primary ms-2" id="btnNext">Next</button>
			</div>
		</div>      

		<div class="border border-dark border-3 mt-2" style="height:140px;overflow-y: scroll;">
			<figure class="text-left p-2">
			  <blockquote class="blockquote">
				<p id="speak_text"></p>
			  </blockquote>
			</figure>
		</div>

		<div class="row mt-2">
			<div class="col-6" id="div_01">
				<div class="btn-group my-3" style="min-height:40px">
				  <button type="button" class="btn btn-primary me-1" id="btnListen">Answer</button>
				  <button type="button" class="btn btn-primary me-1" id="btnClear">Clear</button>

				  <button type="button" class="btn btn-primary me-1 float-end" id="btnSwitchView" style="display:none">Speak</button>
				  <button type="button" class="btn btn-primary me-1 float-end" id="btnSubmit">Submit</button>
				</div>
				<div id="qtext" class="border border-dark border-3 p-3" style="height:100px;overflow-y: scroll;">
					<div class="row">
					<div class="col-6">
					<div class="form-check">
					  <input class="form-check-input" type="radio" value="" id="opt-a" name="qopt">
					  <label class="form-check-label" for="flexCheckDefault">
						Option A
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="radio" value="" id="opt-c" name="qopt">
					  <label class="form-check-label" for="flexCheckChecked">
						Option C
					  </label>
					</div>
					</div>
					
					<div class="col-6">
					<div class="form-check">
					  <input class="form-check-input" type="radio" value="" id="opt-b" name="qopt">
					  <label class="form-check-label" for="flexCheckDefault">
						Option B
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="radio" value="" id="opt-d" name="qopt">
					  <label class="form-check-label" for="flexCheckChecked">
						Option D
					  </label>
					</div>
					</div>
					</div>
				</div>
				<div id="qtalk" class="border border-dark border-3" style="height:100px;overflow-y: scroll;">
				<figure class="text-left p-2">
				  <blockquote class="blockquote">
					  <div id="results">
						<span id="final_span" class="final"></span>
						<span id="interim_span" class="interim"></span>
						<p>
					  </div>
				  </blockquote>
				</figure>
				</div>
			</div>
			<div class="col-6" id="div_02">
				<div class="my-3" style="min-height:40px">
					<select id="listen_lang" class="form-select" style="display:none">
					  <option value="en-IN" selected>English-India</option>
					  <option value="kn-IN">Kannada-India</option>
					</select>
					<h3 id="lbl_score" class="ms-2 mt-2 float-end"></h3>
				</div>
				
				<div class="border border-dark border-3" style="height:100px;overflow-y: scroll;">
				<figure class="text-left p-2">
				  <blockquote class="blockquote">
					<p id="speak_ans"></p>
				  </blockquote>
				</figure>
			</div>
		</div>      
	`

	$('#content_view_id').html(qna_url);
	_cp.on.popVoices();
	_cp.on.initSpeech();

	$("#btnStart").unbind().bind('click', function(e) {_cp.on.quiz_on_start();});
	$("#btnSpeak").unbind().bind('click', function(e) {_cp.on.quiz_on_ask();});
	$("#btnNext").unbind().bind('click', function(e) {_cp.on.quiz_on_next();});
	
	$("#btnListen").unbind().bind('click', function(e) {_cp.on.quiz_on_answer();});
	$("#btnSubmit").unbind().bind('click', function(e) {_cp.on.quiz_on_submit();});
	$("#btnClear").unbind().bind('click', function(e) {_cp.on.quiz_on_clear();});
	
	$('#listen_lang').change(function () {_cp.on.switch_quiz_lang();});
	$("#btnSwitchView").unbind().bind('click', function(e) {_cp.on.switch_view();});
	
	if (isMobile){
		document.getElementById('speak_lang').style.display = 'none';
	}
	
	_cp.on.switch_view();
	_cp.on.quiz_on_init();
	//$('#btnListen').click(function () {listenQnA();});
}

_cp.on.switch_view = function(){	
	if ($('#btnSwitchView').text() === 'Select') {
		$('#qtext').show();
		$('#qtalk').hide();
		
		$('#btnListen').hide();
		$('#btnClear').hide();
		final_span.innerHTML = '';
		$('#btnSwitchView').text('Speak');
	}
	else {
		$('#qtext').hide();
		$('#qtalk').show();
		
		$('#btnListen').show();
		$('#btnClear').show();
		final_span.innerHTML = '';

		//$('#btnSwitchView').text('Select');
		$('#btnSwitchView').text('Speak');
	}
}

_cp.on.switch_quiz_lang = function(){	
	_cp.on.set_voice($('#speak_lang'),$('#listen_lang').val());	
}


_cp.on.setQLen = function(){
	$('#lbl_pos').text(' 0 / ' + $('#quiz_len').val());
}

e_list = []
q_list = []
q_count = 0;
curr_q = 0;
_cp.on.quiz_on_init = function(){

	_cp.on.stop_listening();
	_cp.on.reset_speech();

	$('#btnStart').prop('disabled', false);
	$('#btnSpeak').prop('disabled', true);
	$('#btnNext').prop('disabled', true);

	$('#btnListen').prop('disabled', true);
	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);
	
	_cp.on.set_voice($('#speak_lang'),'en-IN');
	
	q_list = []
	q_count = 0;
	curr_q = 0;

	scores = {}
	scores['right'] = 0
	scores['wrong'] = 0

	speech_text = []	
}

_cp.on.quiz_on_start = function(){
	q_count = $('#quiz_len').val();
	title = $('#id_title').val();
	topics = $('#id_bot_prompt').val();
	grade = $('#id_grdtitle').val();
	subject = $('#id_subtitle').val();
	
	$('#btnStart').prop('disabled', true);
	$('#speak_text').html('Generating the questions... please wait..');

    q_text = 'You are a high school teacher for ' + grade + ' in ' + subject + '. Generate' + q_count + ' multiple-choice questions about' + title + ' including topics around ' + topics + ' and give 4 options to choose from. Return the question, options and answer as a single json in the following format [{"question":"What is earth?","options":["Option A. planet.","Option B. star.","Option C. universe.","Option D. atom."],"answer":"Option A. planet."}]'
    pre_prompt = ''
	post_prompt = 'Ensure that the output is a properly validated JSON.'
	
	//At this stage the quiz info is NOT logged. It is done after the answer.
	j_dat = {'log':'F','mode':'QUIZ','pre_prompt': pre_prompt, 'q': q_text, 'post_prompt':post_prompt}
		
	testMode = false;
	if (testMode){		
		e_list= [{
				  "question": "What is the process called when a liquid changes into a gas?",
				  "options": ["A. Evaporation", "B. Condensation", "C. Freezing", "D. Melting"],
				  "answer": "A. Evaporation"
				},
				{
				  "question": "Which of the following is an example of a renewable resource?",
				  "options": ["A. Coal", "B. Natural gas", "C. Solar energy", "D. Nuclear energy"],
				  "answer": "C. Solar energy"
				},
				{
				  "question": "Which of the following is an example of a chemical change?",
				  "options": ["A. Cutting paper", "B. Melting ice", "C. Burning wood", "D. Dissolving sugar in water"],
				  "answer": "C. Burning wood"
				}]

			lang = 'English'	
			if ($('#listen_lang').val() === 'kn-IN'){lang = 'Kannada'}

			if (lang !== 'English'){				
				$.ajax({
				   url: "/app04/api/mod03/convs/translate-quiz", 
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json; charset=utf-8",
				   data: JSON.stringify(e_list),
				   success: function (result) {
						q_list = result;
						_cp.on.quiz_on_ask();
					},
					error: function (err) {
					// check the err for error details
					}
				}); // ajax call closing								
			}
			else{
				q_list = e_list;
				_cp.on.quiz_on_ask();					
			}

	}
	else{
		_app.post("/app04/api/mod03/convs/askGPT",JSON.stringify(j_dat),function (result) {
			console.log(result);
			e_list = JSON.parse(result);
			lang = 'English'	
			if ($('#listen_lang').val() === 'kn-IN'){lang = 'Kannada'}

			if (lang !== 'English'){
				$.ajax({
				   url: "/app04/api/mod03/convs/translate-quiz", 
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json; charset=utf-8",
				   data: JSON.stringify(e_list),
				   success: function (result) {
						q_list = result;
						_cp.on.quiz_on_ask();
					},
					error: function (err) {
					// check the err for error details
					}
				}); // ajax call closing								
			}
			else{
				q_list = e_list;
				_cp.on.quiz_on_ask();					
			}
		});	
	}
	/*
	$('#btnStart').prop('disabled', true);
	$('#btnSpeak').prop('disabled', false);
	$('#btnNext').prop('disabled', true);

	$('#btnListen').prop('disabled', false);
	$('#btnSubmit').prop('disabled', true);
	*/
}

_cp.on.quiz_on_ask = function(){
	$('#lbl_pos').text((curr_q + 1) + ' / ' + q_count);
	$('#final_span').text('')
	$('#speak_ans').html('');
	
	speech_text['en'] = q_list[curr_q].question;

	txt = [];
	txt[0] = q_list[curr_q].question;
	len = q_list[curr_q].options.length;
	console.log('No of Options are : ' + len);	
	
	for (j = 0;j < 4;j++){
		speech_text['en'] += '<br />' + q_list[curr_q].options[j]
		txt[j+1] = q_list[curr_q].options[j];
	}
	
	$('#speak_text').html(speech_text['en']);
	
	for (j = 0;j < 5;j++){
		_app.log('Speaking...' + txt[j]);
		_cp.on.speak_text(txt[j]);	
	}
	
	$('#btnStart').prop('disabled', true);
	$('#btnSpeak').prop('disabled', false);
	$('#btnNext').prop('disabled', true);

	$('#btnListen').prop('disabled', false);
	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);
	
}

_cp.on.quiz_on_next = function(){
	if (curr_q < q_count - 1){
		curr_q = curr_q + 1;
		_cp.on.quiz_on_ask();
	}
	else {
		alert('End of Quiz.');
	}
}

_cp.on.quiz_on_answer = function(){
	//alert('listening..');
	_cp.on.reset_speech();
	_cp.on.start_listening();
	
	$('#btnStart').prop('disabled', true);
	$('#btnSpeak').prop('disabled', true);
	$('#btnNext').prop('disabled', true);

	$('#btnListen').prop('disabled', true);
	$('#btnSubmit').prop('disabled', false);
	$('#btnClear').prop('disabled', false);
	
}

_cp.on.quiz_on_clear = function(){
	
	_cp.on.stop_listening();
	
	final_span.innerHTML = '';
	interim_span.innerHTML = '';
	$('#final_span').text('')
	$('#speak_ans').html('');

	$('#btnListen').prop('disabled', false);
	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);

}
_cp.on.quiz_on_submit = function(){
	//alert('submitting..');
	_cp.on.stop_listening();	

	lang = 'English'	
	if ($('#listen_lang').val() === 'kn-IN'){lang = 'Kannada'}
		
	
	if (lang === 'English') {
		user_response_en = $('#final_span').text()
		_cp.on.quiz_eval(user_response_en);
	}
	else {
		//If lang is kannada - Convert user response to english and evalutate.
		user_response = $('#final_span').text()
		j_dat = {from_lang: 'kn', to_lang: 'en', txt_body : user_response}
		console.log(j_dat);
		
		$.ajax({
		   url: "/app04/api/mod03/convs/translate", 
		   type: "POST",
		   dataType: "json",
		   contentType: "application/json; charset=utf-8",
		   data: JSON.stringify(j_dat),
		   success: function (result) {
				console.log(result);
				user_response_en = result;
				_cp.on.quiz_eval(user_response_en);
			},
			error: function (err) {
			// check the err for error details
			}
		}); // ajax call closing				
	}

	$('#btnStart').prop('disabled', true);
	$('#btnSpeak').prop('disabled', true);
	$('#btnNext').prop('disabled', false);

	$('#btnListen').prop('disabled', true);
	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);	
}

_cp.on.quiz_eval = function(user_response_en){
    q_text = '"user answer": "' + user_response_en + '"'
    pre_prompt = '"question": "' + e_list[curr_q].question + '",'
	pre_prompt += '"options": "' + e_list[curr_q].options + '",'
	pre_prompt += '"correct answer": "' + e_list[curr_q].answer + '",'
		
	post_prompt = 'If the user answer is similar to the correct answer, mark eval.'
	post_prompt += 'If the user answer is not similar to the correct answer, mark eval as wrong.'
	post_prompt += 'If the user answer is blank, mark eval as wrong.'
	post_prompt += 'Add a one line explanation of the correct answer.'
	post_prompt += '{"eval":"correct","explanation":"A vector has both force and direction."}'
	post_prompt += ' or {"eval":"wrong","explanation":"The correct answer is Option C) both force and direction. This is because a vector has both magnitude and direction."}'
	//post_prompt += ' or {"eval":"wrong","explanation":"ಸರಿಯಾದ ಉತ್ತರವೆಂದರೆ ಆಯ್ಕೆ ಸಿ) ಬಲ ಮತ್ತು ನಿರ್ದೇಶನ ಎರಡೂ. ಏಕೆಂದರೆ ವೆಕ್ಟರ್ ಪರಿಮಾಣ ಮತ್ತು ದಿಕ್ಕು ಎರಡನ್ನೂ ಹೊಂದಿರುತ್ತದೆ"}'
		
    log_text = '{"question": "' + e_list[curr_q].question + '",'
	log_text += '"options": "' + e_list[curr_q].options + '",'
	log_text += '"correct_answer": "' + e_list[curr_q].answer + '",'
    log_text += '"user_answer": "' + $('#final_span').text() + '"}'

    log_json = {"question": e_list[curr_q].question ,
				"options": e_list[curr_q].options ,
				"correct_answer": e_list[curr_q].answer,
				"user_answer": $('#final_span').text()
				}
	
	j_dat = {'log':'T','mode':'QR','pre_prompt': pre_prompt, 'q': q_text,'l':log_json, 'post_prompt':post_prompt,
		'grd_id':$('#id_grd').val(),'grd_name':$('#id_grdtitle').val(),
		'sub_id':$('#id_sub').val(),'sub_name':$('#id_subtitle').val(),
		'chap_id':$('#id').val(),'chap_name':$('#id_title').val()
	}
		
	console.log(j_dat);
	
	testMode = false;
	if (testMode){		
		resp = {"eval": "wrong", "explanation": "The correct answer is A. Evaporation. Evaporation is the process by which a liquid changes into a gas at a temperature below its boiling point."}
		console.log(q_list);
		//q_list = JSON.parse(result);
		_cp.on.quiz_on_ask();
	}
	else{
		_app.post("/app04/api/mod03/convs/askGPT",JSON.stringify(j_dat),function (result) {
			console.log(result);
			resp = JSON.parse(result);
			_cp.on.quiz_on_eval(resp);
		});	
	}	
}

scores = {}
scores['right'] = 0
scores['wrong'] = 0

_cp.on.quiz_on_eval = function(r){

	if ($('#final_span').text() === ''){
		r['eval'] = 'wrong'
	}
	
	_eval = r['eval']

	lang = 'English'
	if ($('#listen_lang').val() === 'kn-IN'){lang = 'Kannada'}
	if (lang === 'Kannada'){
		if (_eval === 'correct') {_eval = 'ಸರಿಯಾಗಿದೆ'}
		if (_eval === 'wrong') {_eval = 'ತಪ್ಪಾಗಿದೆ'}
	}
		
	if (q_count > 0){
		if (r['eval'] === 'correct') scores['right'] += 1;
		if (r['eval'] === 'wrong') scores['wrong'] += 1;		
		$('#lbl_score').text( '[' + scores['right'] + ' correct,' + scores['wrong'] + ' wrong] Score : ' + scores['right'] + ' / ' + q_count);		
	}

	
	if (lang !== 'English'){
		sys_response_en = r['explanation']
		j_dat = {from_lang: 'en', to_lang: 'kn', txt_body : sys_response_en}
		console.log(j_dat);
		
		$.ajax({
		   url: "/app04/api/mod03/convs/translate", 
		   type: "POST",
		   dataType: "json",
		   contentType: "application/json; charset=utf-8",
		   data: JSON.stringify(j_dat),
		   success: function (result) {
				sys_response_kn = result
				$('#speak_ans').html('<h4>' + _eval + '</h4>' + sys_response_kn);
				if ($('#final_span').text() === ''){
					txt = 'You did not answer this question. ' + sys_response_kn;
				}
				else {
					txt = 'ನಿಮ್ಮ ಉತ್ತರ  ' + _eval + '. ' + sys_response_kn;
				}
				_cp.on.speak_text(txt);
			},
			error: function (err) {
			// check the err for error details
			}
		}); // ajax call closing				
		
	}
	else{
		sys_response_en = r['explanation']
		$('#speak_ans').html('<h4>' + _eval + '</h4>' + sys_response_en);
		if ($('#final_span').text() === ''){
			txt = 'You did not answer this question. ' + sys_response_en;
		}
		else {
			txt = 'Your answer is ' + _eval + '. ' + sys_response_en;
		}
		_cp.on.speak_text(txt);
	}	
}







/*
function startQnA(){
	$('#speak_text').text('');	
	$('#speak_ans').text('');	
	final_span.innerHTML = '';
	interim_span.innerHTML = '';
	
	title = $('#id_title').val();
	all_topics = $('#id_bot_prompt').val().split(',');
	
	//var all_topics = ["rivers", "countries", "mountains", "flora","fauna"]
	if ($('#btnStart').text() === 'Start'){
		curr_topics = all_topics.sort(() => .5 - Math.random());
		$('#btnStart').text('Next');
		getQnA(currQ);
	}
	else {
		if (currQ < 5){
			currQ = currQ + 1;
			getQnA(currQ);		}
		else{
			currQ = 0;
			$('#btnStart').text('Start');
		}			
	}	
}

function getQnA(){
	q_count = 3;
	topics = $('#id_bot_prompt').val();
	grade = $('#id_grdtitle').val();
	subject = $('#id_subtitle').val();

    q_text = 'You are a high school teacher for ' + grade + ' in ' + subject + '. Generate' + q_count + ' multiple -choice questions about' + title + ' including topics around ' + curr_topics[currQ] + ' and give 4 options to choose from. Return the question, options and answer as a json in the following format {"question":"What is earth?","options":["A. planet","B. star","C. universe","D. atom"],"answer":"A. planet"}'
    pre_prompt = ''
	post_prompt = ''
	
	j_dat = { 'pre_prompt': pre_prompt, 'q': q_text, 'post_prompt':post_prompt}
		
	x_postJSON ("/app04/api/student/topics/askGPT",j_dat,function (result) {
		   console.log(result);
		   q = JSON.parse(result);
		   askQnA();
	});

	
	$.ajax({
	   url: "/app04/api/student/topics/answer", 
	   type: "POST",
	   dataType: "json",
	   contentType: "application/json; charset=utf-8",
	   data: JSON.stringify(j_dat),
	   success: function (result) {
		   console.log(result);
		   q = JSON.parse(result);
		   askQnA();
		},
		error: function (err) {
		// check the err for error details
		}
	}); // ajax call closing

	
}

function askQnA(){
	//alert('Asking Next Question');
	speech_textKN = '';
	speech_textEN = q.question;
	for (j = 1;j < 5;j++){
		speech_textEN += '\n' + j + '. ' + q.options[j-1]	
	}
	
	$('#speak_text').text(speech_textEN);	
	speak_text(speech_textEN);
}
function listenQnA(){
  if ($('#btnListen').text() === 'Answer'){
	  $('#btnListen').text('Submit');
	  if (recognizing) {
		recognition.stop();
		//return;
	  }
	  final_transcript = '';
	  //recognition.lang = select_dialect.value;
	  recognition.lang = 'en-IN';
	  recognition.start();
	  ignore_onend = false;
	  final_span.innerHTML = '';
	  interim_span.innerHTML = '';
	  //start_img.src = 'images/mic-slash.gif';
	  //showInfo('allow');
	  start_timestamp = event.timeStamp;	  
  }
  else {
	if (recognizing) {
	  recognition.stop();
	  //return;
	}
	  
	$('#btnListen').text('Answer');
	AnswerQnA();
  }		
}

function AnswerQnA(){
	txt = 'The correct answer is ' + q.answer
	$('#speak_ans').text(txt);	
	speak_text(txt);
}
*/

_cp.on.speak_text = function(txt){

	speechSynthesis.onvoiceschanged = null;

	const selectedOption = $("#speak_lang").val();
	const utterThis = new SpeechSynthesisUtterance(txt);

	utterThis.onend = function (event) {
	  console.log("SpeechSynthesisUtterance.onend");
	};

	utterThis.onerror = function (event) {
	  console.error("SpeechSynthesisUtterance.onerror");
	};
	
	for (let i = 0; i < my_voices.length; i++) {
	  if (my_voices[i].name === selectedOption) {
		utterThis.voice = my_voices[i];
	  }
	}	
	console.log(utterThis.voice);
	synth.speak(utterThis);
}
