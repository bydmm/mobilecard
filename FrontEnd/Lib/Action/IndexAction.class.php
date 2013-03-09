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
		$blocks = $blocksModel->select();
		$blocks = $blocksModel->arrayObject($blocks);
		if(!$blocks){
			$blocks = array();
		}
		$this->assign('blocks',$blocks);
		$this->display();
	}
	
	public function saveSite(){
		$blocks = $_POST['blocks'];
		foreach($blocks as $block){
			$block['id'] = '';
		}
		$blocksModel = D('Blocks');
		$blocksModel->query('DELETE FROM pmc_blocks WHERE 1');
		$result = $blocksModel->addAll($blocks);
		if ($result){
		    // success
		    $this->ajaxReturn($result,"success！",1);
		}else{
		    // error
		    $this->ajaxReturn(0,"error！",0);
		}
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