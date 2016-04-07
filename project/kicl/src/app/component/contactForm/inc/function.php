<?
require_once('include.php');

function requireFiles($files){foreach(func_get_args() as $f)require($f);}
function requireFilesOnce($files){foreach(func_get_args() as $f)require_once($f);}

function listCSS($dir){foreach(func_get_args() as $f)?><?=listFiles($f,"<link rel='stylesheet' href='","' />","css");}
function listJS($dir){foreach(func_get_args() as $f)?><?=listFiles($f,"<script src='","'></script>","js");}
function listFiles($dir,$start,$end,$ext){
	global $root;
	$exclude=array('css3pie','template','requirejs','init.js','modernizr.min.js','plugins.js');
	$r='';
	error_reporting(E_ERROR | E_PARSE);
	if($h=opendir($dir)):
		$d=explode($root,$dir);
		$dr=$d[count($d)-1];
		while(false!==($f=readdir($h))):
			if($f!="."&&$f!=".."&&$f!=".DS_Store"):
				$n=$dr."/".$f;
				$fn=explode(".",$f);
				if(count($fn)>1):
					$ex=explode('|',$ext);
					if(in_array($fn[count($fn)-1],$ex)):!in_array($f,$exclude)?$r.=$start.$n.$end."\r\n":"";endif;
				else:
					$r.=!in_array($f,$exclude)?listFiles($dir."/".$f,$start,$end,$ext):"";
				endif;
			endif;
		endwhile;
		closedir($h);
	endif;
	if($r!='')return $r;
}
function aasort (&$array, $key){
	$sorter=array();
	$ret=array();
	reset($array);
	foreach($array as $ii=>$va)$sorter[$ii]=$va[$key];
	asort($sorter);
	foreach($sorter as $ii=>$va)$ret[$ii]=$array[$ii];
	$array=$ret;
}
?>