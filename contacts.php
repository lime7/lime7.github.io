<?php

	define("CONTACT_FORM", 'test-s4cnyu3e3@srv1.mail-tester.com');

	$subject = 'Заявка';

	$name  = stripslashes($_POST['name']);
	$phone = stripslashes($_POST['phone']);	
		

	$message = '
		<html>
				<head>
						<title>Заявка на звонок</title>
						<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
				</head>
				<body>
						<p>Имя     : '.$name.'</p>	
						<p>Phone   : '.$phone .'</p>
				</body>
		</html>';


	$mail = mail(CONTACT_FORM, $subject, $message,
		"MIME-Version: 1.0\r\n"
	    ."From: ".$name." <".CONTACT_FORM.">\r\n"
	    ."Reply-To: ".$phone."\r\n"
	    ."Content-type: text/html; charset=UTF-8\r\n");

	if($mail){
		echo "OK";
	}
?>