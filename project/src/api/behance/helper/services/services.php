<?
	require $_SERVER['DOCUMENT_ROOT'].'/api/_secrets.php';

	class ServicesClass {
		private $conn = '';

		private function connect () {
			$conn = new mysqli(
				SECRET_API_SERVERNAME.(SECRET_API_PORT ? ':'.SECRET_API_PORT : ''),
				SECRET_API_USERNAME,
				SECRET_API_PASSWORD,
				SECRET_API_DATABASE
			);

			if ($conn -> connect_error) {
				die($conn -> connect_error);
			}

			$this -> conn = $conn;
		}

		private function disconnect () {
			$this -> conn -> close();
		}

		private function url () {
			$url = '';

			$behance = $this -> conn -> query('SELECT * FROM `behance` LIMIT 1');
			$behance_service = $this -> conn -> query('SELECT * FROM `behance_services` LIMIT 1');

			while($behance_row = $behance -> fetch_assoc()) {
				$url = $url . $behance_row['uri'] . '/' . $behance_row['version'] . '/';

				while($behance_service_row = $behance_service -> fetch_assoc()) {
					$service_path = str_replace(
						array('{user_id}', '{project_id}'),
						array($behance_row['user_id'], $_GET['id']),
						$behance_service_row[$this -> service]
					);

					$url = $url . $service_path;
				}

				$url = $url . '?api_key=' . $behance_row['api_key'];
			}

			return $url;
		}

		public function get ($service) {
			$this -> service = $service;

			$this -> connect();
			$url = $this -> url();
			$this -> disconnect();
			
			header('Access-Control-Allow-Origin: http://{servername}');
			header('Content-Type: application/json');

			if ($_GET['callback']) {
				return $_GET['callback'].'('.file_get_contents($url).')';
			}

			return file_get_contents($url);
		}
	}
?>