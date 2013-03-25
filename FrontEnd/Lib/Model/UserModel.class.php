<?php
class UserModel extends Model{
	
	public function login()
	{
		
	}
	
	public function isLogin()
	{
		return isset($_SESSION['member']);
	}
	
}
?>