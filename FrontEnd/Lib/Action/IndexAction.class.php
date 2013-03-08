<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
	
	public function index(){
		$this->display();
	}
	
	public function TechnicalSupport(){
		$this->display();
	}
	
	public function admin(){
		$blocks = Array();
		$block = new stdClass();
		$block->title = 'INFO';
		$block->link = '#summery';
		$block->id = '1';
		$block->order = '1';
		$block->border_radius = "15";
		$block->backgroundColor = ('rgb(255, 122, 0)');
		$block->fontfamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		$block = new stdClass();
		$block->title = 'TEL';
		$block->link = 'tel://0344-652171';
		$block->id = '2';
		$block->order = '2';
		$block->border_radius = "15";
		$block->backgroundColor = ('rgb(255, 122, 0)');
		$block->fontfamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		$block = new stdClass();
		$block->title = 'MAIL';
		$block->link = 'mailto:info@fysiotherapieboxman.nl';
		$block->id = '3';
		$block->order = '3';
		$block->border_radius = "15";
		$block->backgroundColor = ('rgb(255, 122, 0)');
		$block->fontfamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		$block = new stdClass();
		$block->title = 'ROUTE';
		$block->link = 'https://maps.google.com/maps?f=q&source=s_q&hl=en-us&geocode=+&authuser=0&q=Blankenburgsestraat+18a+4061+AR+Ophemert&ie=UTF8&view=map&cid=4985804135234600851&iwloc=A';
		$block->id = '4';
		$block->order = '4';
		$block->border_radius = "15";
		$block->backgroundColor = ('rgb(255, 122, 0)');
		$block->fontfamily = 'Helvetica Neue, Helvetica, Arial, sans-serif';
		$block->summery = '';
		$blocks[] = $block;
		$this->assign('blocks',$blocks);
		$this->display();
	}
}