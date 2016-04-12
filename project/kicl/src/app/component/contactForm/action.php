<?
require_once("inc/include.php");
require_once("inc/freakmailer.php");

header("Access-Control-Allow-Origin: *");

$msg = array();

function markup ($folder,$name,$message) {
	global $root;
	$path = $root."/app/component/contactForm/mailer/partial/".$folder;

	return file_get_contents($path."/before.php").$name.file_get_contents($path."/middle.php").$message.file_get_contents($path."/after.php");
}

if ($_POST) {
	$param = $_POST;
}

if ($_GET) {
	$param = $_GET;
}

if (!$param) {
	$msg[] = '"status":204';
	$msg[] = '"message":"Form is empty"';

	exit('{' . join(',', $msg) . '}');
}

extract($param);

if ($userid != "") {
	$msg[] = '"status":400';
	$msg[] = '"message":"Bad Request"';

	exit('{' . join(',', $msg) . '}');
}

$msg[] = '"name":' . ($name == '' ? 'false' : 'true');
$msg[] = '"email":' . ($email == '' ? 'false' : 'true');
$msg[] = '"message":' . ($message == '' ? 'false' : 'true');

if($name != "" && $email != "" && $message != "") {
	email(html_entity_decode($siteautoreply), $email, $name, 'Ki.CL Auto Reply - DO NOT REPLY TO THIS EMAIL', markup('autoreply',$name,$message));
	email($email, html_entity_decode($siteemail), $name, 'Contact via Ki.CL', markup('notice','<a href="mailto:'.$email.'" style="border-bottom:#f66 dotted 1px; color:#666; text-decoration:none;">'.$organlization.' '.$name.'</a>',$message));

	$msg[] = '"status":200';

	exit('{' . join(',', $msg) . '}');
}

$msg[] = '"status":206';
$msg[] = '"message":"One or more fields are missing"';

exit('{' . join(',', $msg) . '}');

?>
