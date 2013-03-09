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
		$blocksModel = D('Blocks');
		$blocks = $blocksModel->data();
		$this->assign('blocks',$blocks);
		$this->display();
	}
	
	public function login()
	{
		$user = D('User');
		if($user->login()){
			redirect('index.php?a=admin', 0, '...');
		}
		
	}
	
	public function checkLogin()
	{
		$user = D('User');
		$user->checkLogin();
		if($user->login()){
			redirect('index.php?a=admin', 0, '...');
		}
		
	}	
}