<?
require_once("include.php");
require_once("phpmailer/class.phpmailer.php");
class FreakMailer extends PHPMailer{
	var $priority = 3;
	var $to_name;
	var $to_email;
	var $From = null;
	var $FromName = null;
	var $Sender = null;
	
	function FreakMailer(){
		$site = array(
			'from_name'=>'Ki.CL',
			'from_email'=>'autoreply@ki-cl.com',
			'smtp_mode'=>'disabled'
		);
		
		if($site['smtp_mode'] == 'enabled'){
			$this->IsSMTP();
			$this->Host = $site['smtp_host'];
			$this->Port = $site['smtp_port'];
			if($site['smtp_username'] != ''){
				$this->SMTPAuth = true;
			}
			$this->Mailer = "smtp";
		}
		if(!$this->From)		$this->From = $site['from_email'];
		if(!$this->FromName)	$this->FromName = $site['from_name'];
		if(!$this->Sender)		$this->Sender = $site['from_email'];
		
		//$this->AddReplyTo($site['from_email'], $site['from_name']);
		$this->ConfirmReadingTo = $site['from_email'];
		$this->isHTML(true);
		$this->Priority = $this->priority;
	}
}
function email($from, $to, $name, $subject, $message){
	$messages = mb_convert_encoding($message, mb_detect_encoding($message),"AUTO");
	$replace_messages = stripslashes($messages);
	
	$mailer = new FreakMailer();
	$mailer->SMTPDebug=1;
	$mailer->From = $from;
	$mailer->FromName = $name;
	$mailer->Subject = $subject;
	$mailer->Body = $replace_messages;
	//$mailer->AltBody($replace_messages);
	
	$to_add = explode(",", $to);
	$n = count($to_add);
	if ($n > 0){
		for($i=0; $i<$n; $i++){
			$mailer->AddAddress($to_add[$i]);
		}
	}else $mailer->AddAddress($to);
	
	//echo "Entered Email routine.\n";
	//echo $mailer->Body;
	//Debugg: Uncommon to use
	//if(!$mailer->Send()) echo 'There was a problem sending this mail!';
	//else echo 'Mail sent!';
	
	$mailer->Send();
	
	$mailer->ClearAddresses();
	$mailer->ClearAttachments();
}
?>