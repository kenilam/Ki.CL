<?
require_once("inc/include.php");
require_once("inc/freakmailer.php");

header("Access-Control-Allow-Origin: *");

$msg='{';

if ($_POST) $param=$_POST;
elseif ($_GET) $param=$_GET;
if (!$param):$msg.='empty:true,';endif;
extract($param);

if ($userid!=""):$msg.='spam:true,';
else:
	$msg.='name:'.($name==''?'false':'true').',';
	$msg.='email:'.($email==''?'false':'true').',';
	$msg.='message:'.($message==''?'false':'true').',';

	if($name!=""&&$email!=""&&$message!=""):
		email($siteautoreply, $email, $name, 'Ki.CL Auto Reply - DO NOT REPLY TO THIS EMAIL', markup('autoreply',$name,$message));
		email($email, $siteemail, $name, 'Contact via Ki.CL', markup('notice','<a href="mailto:'.$email.'" style="border-bottom:#f66 dotted 1px; color:#666; text-decoration:none;">'.$organlization.' '.$name.'</a>',$message));
		$msg.='success:true,';
	endif;
endif;

echo json_decode($msg.'end:"end"}');

function markup($folder,$name,$message){
	global $root;
	$path=$root."/app/component/contactForm/mailer/partial/".$folder;
	return
	file_get_contents($path."/before.php").
	$name.
	file_get_contents($path."/middle.php").
	$message.
	file_get_contents($path."/after.php");
}

if ($submissions){};
?>
