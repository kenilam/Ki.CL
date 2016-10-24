<?
	require_once $_SERVER['DOCUMENT_ROOT'].'/api/behance/helper/services/services.php';

	$service = new ServicesClass();
	echo $service -> get('projects');
?>