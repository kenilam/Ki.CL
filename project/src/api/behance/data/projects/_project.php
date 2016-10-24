<?
	require_once $_SERVER['DOCUMENT_ROOT'].'/api/behance/helper/services/services.php';

	class ProjectClass extends ServicesClass {
		public function get ($id) {
			$_GET['id'] = $id;

			return parent::get('project');
		}
	}
?>