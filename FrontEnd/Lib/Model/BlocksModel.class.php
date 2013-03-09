<?php
class BlocksModel extends Model{
	
	public function data(){
		$blocks = Array();
		$block = new stdClass();
		$block->title = 'INFO';
		$block->link = '#summery';
		$block->id = '1';
		$block->order = '1';
		$block->border_radius = "15";
		$block->background_color = ('rgb(255, 122, 0)');
		$block->font_family = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		$block->title = 'INFO';
		$block->link = '#summery';
		$block->id = '2';
		$block->order = '2';
		$block->border_radius = "15";
		$block->background_color = ('rgb(255, 122, 0)');
		$block->font_family = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		return $blocks;
	}
	
}
?>