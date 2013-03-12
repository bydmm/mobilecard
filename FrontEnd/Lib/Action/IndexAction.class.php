<?php
class IndexAction extends Action {

	public function index(){
		$blocksModel = D('Blocks');
		$blocks = $blocksModel->select();
		$blocks = $blocksModel->arrayObject($blocks);
		$this->assign('blocks', $blocks);

		$siteModel = D('site');
		$site = $siteModel->find();

		$pattern = "/([a-z0-9\-_\.]+@[a-z0-9]+\.[a-z0-9\-_\.]+)/"; 
		// 将邮箱替换为相应的链接
		$site['footer'] = preg_replace($pattern, '<a href="mailto:\\1">\\1</a>', $site['footer']);

		$pattern = "/([0-9]+-[0-9]+)/"; 		
		// 将电话号码替换为相应的链接
		$site['footer'] = preg_replace($pattern, '<a href="tel:\\1">\\1</a>', $site['footer']);

		$pattern = "/([0-9]{7,})/"; 		
		// 将电话号码替换为相应的链接
		$site['footer'] = preg_replace($pattern, '<a href="tel:\\1">\\1</a>', $site['footer']);

		$this->assign('site', $site);

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
		//var_dump($blocks);
		foreach($blocks as $key=>$block){
			unset($blocks[$key]['id']);
		}

		$blocksModel = D('Blocks');
		$blocksModel->where('id > 0')->delete();
		$result = $blocksModel->addAll($blocks);
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
}