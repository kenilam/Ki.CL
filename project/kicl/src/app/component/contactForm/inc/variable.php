<?
$root=$_SERVER['DOCUMENT_ROOT'];

$site='http://'.ereg_replace(
"^(www.)?([^.]+).[^.]+$", "\\2",
$_SERVER['HTTP_HOST']
);

$siteemail='hello@ki-cl.com';
$siteautoreply='autoreply@ki-cl.com';
$sitename='Ki.CL';
?>