<?
	require_once $_SERVER['DOCUMENT_ROOT'].'/api/behance/data/projects/_project.php';
	
	$service = new ProjectClass();
	echo $service -> get(1177609);
?>