/*
bot_on_init
bot_on_start
bot_on_ask - end of ask is submit.
bot_on_submit
bot_on_speak - end of speak is start.
bot_on_set
*/

_cp.on.show_adminbot = function(){
	go('v');
	//alert('Showing BOT1');
	
	ask_url = `	
		<div class="my-2">
			<div class="btn-group" role="group" aria-label="Basic example">
			  <button type="button" class="btn btn-primary" style="width:80px" id="btnListen">Ask</button>
			  <button type="button" class="btn btn-primary ms-2" style="width:60px" id="btnSubmit">Submit</button>
			</div>
			<div class="btn-group float-end" role="group" aria-label="Basic example">
			  <select id="listen_lang" class="form-select" style="width:260px">
				<option value="en-IN" selected>English-India</option>
				<option value="kn-IN">Kannada-India</option>
				<option value="hi-IN">Hindi-India</option>
				<option value="ta-IN">Tamil-India</option>
			  </select>
			  <button type="button" class="btn btn-primary ms-2" id="btnClear">Clear</button>
			  <!--<button type="button" class="btn btn-primary ms-1" id="btnTranslateFrom">Translate</button>-->
			</div>
		</div>

		<div class="border border-dark border-3" style="height:100px;overflow-y: scroll;">
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
		
		<div class="border border-dark border-3 mt-4" style="height:100px;overflow-y: scroll;">
			<figure class="text-left p-2">
			  <blockquote class="blockquote">
				<p id="speak_text"></p>
			  </blockquote>
			</figure>
		</div>

		<div class="my-2">
			<button type="button" class="btn btn-primary ms-1" id="btnSpeak">Speak</button>
			<div class="btn-group float-end" role="group" aria-label="Basic example">
			  <select id="speak_lang" style="max-width:250px" class="form-select">

			  </select>
			  <div id="rate-control" class="mt-2 mx-2">
			    <label for="rate">Rate:</label>
			    <input type="range" min="0.5" max="1.5" value="1" step="0.1" id="rate" />
			  </div>			  
			  <button type="button" class="btn btn-primary ms-1" id="btnReset">Reset</button>
			  <!--<button type="button" class="btn btn-primary float-end ms-1" id="btnTranslate">Translate</button>-->
			</div>
		</div>      
	`

	$('#content_view_id').html(ask_url);
	popVoices();
	initSpeech();

	$("#btnListen").unbind().bind('click', function(e) {bot_on_ask();});

	//$('#btnListen').click(function () {bot_on_ask();});
	
	//$('#btnSubmit').click(function () {submit_speech();});
	$('#btnSubmit').click(function () {bot_on_submit();});
	
	//$('#btnClear').click(function () {clear_speech();});
	$('#btnClear').click(function () {bot_on_start();});

	$('#btnSpeak').click(function () {bot_on_speak();});
	$('#btnReset').click(function () {bot_on_set();});
	
	$('#speak_lang').change(function () {change_lang();});
	$('#listen_lang').change(function () {switch_lang();});
	
	//$("#btnPostFeedback").unbind().bind('click', function(e) {
	//	alert('Thank you for your feedback.');		
	//});		

	bot_on_start();

}

function show_userbot(){

	go('v');
	//alert('Showing BOT1');
	
	ask_url = `	
		<div class="my-2">
			<div class="btn-group" role="group" aria-label="Basic example">
			  <button type="button" class="btn btn-primary" style="width:80px" id="btnListen">Ask</button>
			  <button type="button" class="btn btn-primary ms-2" style="width:60px" id="btnSubmit">Submit</button>
			</div>
			<div class="btn-group float-end" role="group" aria-label="Basic example">
			  <select id="listen_lang" class="form-select" style="width:260px">
				<option value="en-IN" selected>English-India</option>
				<option value="kn-IN">Kannada-India</option>
				<option value="hi-IN">Hindi-India</option>
				<option value="ta-IN">Tamil-India</option>
			  </select>
			  <button type="button" class="btn btn-primary ms-2" id="btnClear">Clear</button>
			  <!--<button type="button" class="btn btn-primary ms-1" id="btnTranslateFrom">Translate</button>-->
			</div>
		</div>

		<div class="border border-dark border-3" style="height:100px">
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
		
		<div class="border border-dark border-3 mt-4" style="height:140px;overflow-y: scroll;">
			<figure class="text-left p-2">
			  <blockquote class="blockquote">
				<p id="speak_text"></p>
			  </blockquote>
			</figure>
		</div>

		<div class="my-2">
			<button type="button" class="btn btn-primary ms-1" id="btnSpeak">Speak</button>
			<div class="btn-group float-end" role="group" aria-label="Basic example">
			  <select id="speak_lang" style="max-width:250px" class="form-select">

			  </select>
			  <div id="rate-control" class="mt-2 mx-2">
			    <label for="rate">Rate:</label>
			    <input type="range" min="0.5" max="1.5" value="1" step="0.1" id="rate" />
			  </div>			  
			  <button type="button" class="btn btn-primary ms-1" id="btnReset">Reset</button>
			  <!--<button type="button" class="btn btn-primary float-end ms-1" id="btnTranslate">Translate</button>-->
			</div>
		</div>      
	`

	$('#content_view_id').html(ask_url);
	popVoices();
	initSpeech();

	$("#btnListen").unbind().bind('click', function(e) {bot_on_ask();});

	//$('#btnListen').click(function () {bot_on_ask();});
	
	//$('#btnSubmit').click(function () {submit_speech();});
	$('#btnSubmit').click(function () {bot_on_submit();});
	
	//$('#btnClear').click(function () {clear_speech();});
	$('#btnClear').click(function () {bot_on_start();});

	$('#btnSpeak').click(function () {bot_on_speak();});
	$('#btnReset').click(function () {bot_on_set();});
	
	$('#speak_lang').change(function () {change_lang();});
	$('#listen_lang').change(function () {switch_lang();});
	
	//setQnAControls('init');
	bot_on_start();
	set_voice($('#speak_lang'),'en-IN');
}

function switch_lang(){	
	set_voice($('#speak_lang'),$('#listen_lang').val());	
}


function bot_on_start(){
	//Clear and reset function
	final_transcript = '';
	stop_listening();
	reset_speech();

	//enable/disable buttons
	$('#btnListen').prop('disabled', false);
	$('#listen_lang').prop('disabled', false);

	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);	
	$('#btnSpeak').prop('disabled', true);
	$('#btnReset').prop('disabled', true);
	$('#speak_lang').prop('disabled', false);
	$('#rate').prop('disabled', true);

	//reset text and values
	$('#btnListen').text('Ask');
	final_span.innerHTML = '';
	interim_span.innerHTML = '';
	$('#speak_text').text('');
	$('#listen_text').text('')
	speech_text = []
		
}

function bot_on_ask(){
	reset_speech();
	$('#btnReset').text('Reset');

	//enable/disable buttons
	$('#btnListen').prop('disabled', false); //This is now pause or continue.
	$('#btnSubmit').prop('disabled', false);
	$('#btnClear').prop('disabled', false);

	$('#listen_lang').prop('disabled', true);	
	$('#btnSpeak').prop('disabled', true);
	$('#btnReset').prop('disabled', true);
	$('#speak_lang').prop('disabled', false);
	$('#rate').prop('disabled', true);
	
	//reset text and values
	if ($('#btnListen').text() === 'Ask') {
		final_span.innerHTML = '';
		$('#speak_text').text('');	
		$('#listen_text').text('');
		speech_text = [];
		$('#btnSpeak').text('Speak'); 	
	}

	//Clear and reset function
	if ($('#btnListen').text() === 'Ask' || $('#btnListen').text() === 'Continue'){
		$('#btnListen').text('Pause');		
		start_listening();
	}
	else {
		$('#btnListen').text('Continue');
		stop_listening();
	}	
}

function bot_on_submit(){	
	//enable/disable buttons
	$('#btnListen').prop('disabled', false);	
	$('#btnSubmit').prop('disabled', true);
	$('#listen_lang').prop('disabled', true);
	$('#btnClear').prop('disabled', true);	
	$('#btnSpeak').prop('disabled', false);
	$('#btnReset').prop('disabled', false);	
	$('#speak_lang').prop('disabled', true);
	$('#rate').prop('disabled', true);

	//reset text and values
	$('#btnListen').text('Ask');
	$('#btnSpeak').text('Speak'); 	
	
	//final_span.innerHTML = '';
		
	console.log('@@@@@@@@@@@@@@@@@@@@@@-v2');
	console.log($('#listen_lang').val());
	
	if ($('#listen_lang').val() !== 'en-IN'){
		in_lang = get_input_lang();
		j_dat = {from_lang: in_lang, to_lang: 'en', txt_body : $('#final_span').text()}
		console.log(JSON.stringify(j_dat))		
		x_postJSON ("/app04/api/student/topics/translate",j_dat,function (result) {
		   console.log(result);
		   call_GPT(result, $('#final_span').text());
		   //speech_text['en'] = result
		});			
	}
	else {
		call_GPT($('#final_span').text(), $('#final_span').text());
	}
}

function call_GPT(q_text, l_text){
	topics = $('#id_bot_prompt').val();
	grade = $('#id_grdtitle').val();
	subject = $('#id_subtitle').val();

    pre_prompt = 'You are a high school teacher for ' + grade + ' in ' + subject + '. The topics are ' + topics + '. Answer ONLY to the topic.'
	post_prompt = 'Answer in not more than 3 sentences. For questions outside the topic, only respond "My knowledge on this topic is limited." without saying anything else.'
	
	/*
	j_dat = { 'pre_prompt': pre_prompt, 'q': q_text, 'post_prompt':post_prompt,
		'grd_id':$('#id_grd').val(),'grd_name':$('#id_grdtitle').val(),
		'sub_id':$('#id_sub').val(),'sub_name':$('#id_subtitle').val(),
		'top_id':$('#id').val(),'top_name':$('#id_title').val(),
		'cls_id':$('#id_cls').val(),'cls_name':$('#id_clstitle').val(),'sec_id':'','sec_name':''
	}
	*/

	j_dat = {'log':'T','mode':'ASK', 'pre_prompt': pre_prompt, 'q': q_text,'l':l_text, 'post_prompt':post_prompt,
		'grd_id':$('#id_grd').val(),'grd_name':$('#id_grdtitle').val(),
		'sub_id':$('#id_sub').val(),'sub_name':$('#id_subtitle').val(),
		'top_id':$('#id').val(),'top_name':$('#id_title').val()
	}
	//ngo,org,user,role are added from x-ses in the backend.	
	console.log(j_dat);
	
	x_postJSON ("/app04/api/student/topics/askGPT",j_dat,function (result) {
	   console.log(result);
	   //$('#speak_text').text('You said, and I quote, ' + $('#final_span').text());
	   speech_text = []
	   speech_text['en'] = result;
	   console.log('CALLING XLTE on results...');
	   translate_text2(true);
	   //$('#speak_text').text(speech_text['en']);
	   //speak
	   //setTimeout( function() { bot_on_speak(); }, 5000);
	   
	});			
}

function bot_on_speak(){
	//enable/disable buttons
	$('#btnListen').prop('disabled', false);
	$('#listen_lang').prop('disabled', false);

	$('#btnSubmit').prop('disabled', true);
	$('#btnClear').prop('disabled', true);
	
	$('#btnSpeak').prop('disabled', false);
	$('#btnReset').prop('disabled', false);
	$('#speak_lang').prop('disabled', true);
	$('#rate').prop('disabled', true);

	//reset text and values
	$('#btnListen').text('Ask');
	
	//Clear and reset function
	stop_listening();
	//alert('Starting Speech');
	start_speech();
	
}

function bot_on_set(){
	if ($('#btnReset').text() === 'Reset') {
		//enable/disable buttons
		$('#btnListen').prop('disabled', false);
		$('#listen_lang').prop('disabled', false);

		$('#btnSubmit').prop('disabled', true);
		$('#btnClear').prop('disabled', true);
		
		$('#btnSpeak').prop('disabled', true);
		$('#btnReset').prop('disabled', false);
		$('#speak_lang').prop('disabled', false);
		$('#rate').prop('disabled', false);
		$('#btnReset').text('Apply');
		reset_speech();
	}
	else {		
		$('#btnListen').prop('disabled', false);
		$('#listen_lang').prop('disabled', false);

		$('#btnSubmit').prop('disabled', true);
		$('#btnClear').prop('disabled', true);
		
		$('#btnSpeak').prop('disabled', false);
		$('#btnReset').prop('disabled', false);
		$('#speak_lang').prop('disabled', true);
		$('#rate').prop('disabled', true);
		$('#btnReset').text('Reset');
		start_speech();
	}
}

