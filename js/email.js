  	function formatScenarioEmail(data,txt) {
		var msgTxt = "<div>" + txt + "</div>";
		msgTxt += "<hr /><p>Click on the link below to view the dilution scenario at OwnYourVenture.com</p>";
		msgTxt += "<br/>";
		msgTxt += '<p><a href=' + data + '>' + data + '</a></p>';
		msgTxt += "<p>If you are unable to click the link above, try copying and pasting the string into your browser.</p>";
		msgTxt += "<p><strong>Please note:</strong> This URL is valid for no less than one year.</p>";
		
		var emailJSON = { 
			from: document.form1.fromEmail.value, 
			fromName: document.form1.fromName.value,
			to: document.form1.toEmail.value,
			ccMe: document.form1.ccMe.checked,
			message: msgTxt,
			recaptcha_response_field: document.form1.recaptcha_response_field.value,
			recaptcha_challenge_field: document.form1.recaptcha_challenge_field.value, 
			subject: "Dilution scenario by OwnYourVenture.com" };
		$.post("/php/sendMail.php", emailJSON,
		  function(sendMailReply){
		  	if(sendMailReply=="1"){
				$('#partnerDialog').load('/content/dialogs/msgSent.html');
			} else {
				Recaptcha.reload();
				$('#emailSendBtn').removeClass('hidden');
				$('#sendingSpan').addClass('hidden');
				alert(sendMailReply);
			}
		  });
	}
	
  	function sendEmail() {
		//hide the button and show the loading span
		$('#emailSendBtn').addClass('hidden');
		$('#sendingSpan').removeClass('hidden');
		var url = "http://www.ownyourventure.com/seed_calculator.html?v=1.1&amp;json=" + controller.getStateJSON();
		//send the full url to the short_url service and append tiny url to message
		$.post("/php/short_url/index.php", { u_advanced: "", u: url, ajax: "true" },
		  function(data){
			formatScenarioEmail(data, document.form1.message.value);
		  });		
	}