<?php
class BlocksModel extends Model{
	
	public function arrayObject($data)
	{
		$new_data = array();
		foreach ($data as $row) {
			$new_item = new stdClass();
			foreach ($row as $key => $item) {
				$new_item->$key = $item;
			}
			$new_data[] = $new_item;
		}
		return $new_data;
	}
	
}
?>