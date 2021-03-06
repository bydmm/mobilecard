<?php
class IndexAction extends Action {

	public function index(){
		$blocksModel = D('Blocks');
		$blocks = $blocksModel->select();
		$blocks = $blocksModel->arrayObject($blocks);
		
		$pattern = "/^#summery/"; 
		foreach ($blocks as $key => $value) {
			if (preg_match($pattern, $value->link)) {
				$blocks[$key]->link = U("Index/summery?id=$value->id");
			}
		}

		$this->assign('blocks', $blocks);

		$siteModel = D('site');
		$site = $siteModel->find();

		$this->assign('site', $site);

		$this->display();
	}

	public function summery(){
		$blocksModel = D('Blocks');
		$summery = $blocksModel->find($_GET['id']);
		$this->assign('summery', $summery);

		$this->display();
	}
	
	public function TechnicalSupport(){
		$this->display();
	}
	
	public function admin(){
		$this->isLogin();

		$blocksModel = D('Blocks');
		$blocks = $blocksModel->select();
		$blocks = $blocksModel->arrayObject($blocks);
		if(!$blocks){
			$blocks = array();
		}
		$siteModel = D('site');
		$this->assign('site', $siteModel->find());
		$this->assign('blocks',$blocks);
		$this->display();
	}
	
	public function saveSite(){
		$site = $_POST['site'];
		$siteModel = D('site');
		$siteModel->where('id > 0')->delete();
		$siteModel->add($site);

		$blocks = $_POST['blocks'];
		
		foreach($blocks as $key=>$block){
			unset($blocks[$key]['id']);
		}

		$blocksModel = D('Blocks');
		$blocksModel->where('id > 0')->delete();
		foreach ($blocks as $key => $value) {
			$blocksModel->add($value);
		}

		if ($result){
		    // success
		    $this->ajaxReturn($result, "success！", 1);
		}else{
		    // error
		    $this->ajaxReturn(0, "error！", 0);
		}
	}
	
	public function login(){
		// 用户已经登陆
		if (session('uid')){
    		$this->success('You have already landed', '__URL__/admin');
    	}else {
    		$this->display();
    	}
	}
	
	public function checkLogin(){
		//用户对象实例化
		$User = D('Users');

		//取得表单提交的账号与密码
    	$vo = $User->create();

		if(!$vo){
    		$this->error('Error');
    	} else {
    		$name = $vo['name'];
    		$password = $vo['password'];
    		//$password = md5($vo['password']+'key');
    		
    		//查询数据库中的账号与密码
    		$User->where("`name`='$name'")->find(); 
    		
    		if ($name == $User->name && $password == $User->password){
    			//记录用户登陆
    			session('uid', $User->id);
    			session('name', $name);
    			$this->success('Success', '__URL__/admin');
    		}else{
    			$this->error('Error');
    		}
    	}
	}	

	private function isLogin(){
    	if (!session('uid')){
    		$this->error('Please Login', '__URL__/login');
    	}
	}

	public function logout(){
    	session('uid', null);
    	session('name', null);
    	$this->success('Logout', '__URL__/login');
    }
	
	public function emoto(){
		$emoto = D('Emoto');
		$emotos = $emoto->select();
		$this->assign('emotos',$emotos);
		$this->display();
	}
}