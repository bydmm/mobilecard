<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>demo</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Kyoma Houohin">
	<link rel="stylesheet" href="<?php echo CSS?>/bootstrap.css" type="text/css" title="no title" charset="utf-8">
	<link rel="stylesheet" href="<?php echo CSS?>/style.css" type="text/css" title="no title" charset="utf-8">
	<link rel="stylesheet" href="<?php echo CSS?>/slider.css" type="text/css" title="no title" charset="utf-8">
	<link rel="stylesheet" href="<?php echo CSS?>/colorpicker.css" type="text/css" title="no title" charset="utf-8">
	<!-- Date: 2013-03-02 -->
</head>
<body>
	<div class="navbar navbar-inverse navbar-fixed-top">
	  <div class="navbar-inner">
	    <div class="container">
				<a class="brand" href="#" title="Personal Mobility Center" >
					PMC
				</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
					  <li class="active"><a href="#">Admin</a></li>
					  <li><a href="#about">About</a></li>
					  <li><a href="#contact">Contact</a></li>
					</ul>
			 </div><!--/.nav-collapse -->
	    </div>
	  </div>
	</div>
	<div class="container-fluid" style="margin-top:40px;">
		<div class="row-fluid">
			<div class="span4 preview">
				<div class="basic">
					<div class="row-fluid header">
						<span class="span6" >
							<a href="index.php"><img class="logo" src="<?php echo IMAGES ?>/logo.png"/></a>
						</span>
						<span class="span6" >Fysiotherapie Boxman</span>
					</div>
					<div class="row-fluid">
						<a class="span6 custombtn">INFO</a>
						<a class="span6 custombtn" href="tel://0344-652171">BEL</a>
					</div>
					<div class="row-fluid">
						<a class="span6 custombtn" href="mailto:info@fysiotherapieboxman.nl" >MAIL</a>
								<a class="span6 custombtn" href="https://maps.google.com/maps?f=q&source=s_q&hl=en-us&geocode=+&authuser=0&q=Blankenburgsestraat+18a+4061+AR+Ophemert&ie=UTF8&view=map&cid=4985804135234600851&iwloc=A">ROUTE</a>
					</div>						
				</div>
			</div>
			<div class="span8 tools">
				<form class="form-horizontal">
				  <fieldset>
				    <legend>Custom</legend>
				    <div class="control-group">
				      <label class="control-label" for="input01">Border-radius</label>
				      <div class="controls">
								<div class="noUiSlider"></div>
				        <input type="hidden" class="input-xlarge" id="input01">
				        <p class="help-block">slider</p>
				      </div>
				    </div>
				    <div class="control-group">
				      <label class="control-label" for="input01">colorpicker</label>
				      <div class="controls">
								<div class="colorpicker input-append color" data-color="rgb(255, 146, 180)" data-color-format="rgb">
								  <input type="text" class="input-xlarge" value="" readonly >
								  <span class="add-on">
										<i style="background-color: rgb(255, 146, 180)"></i>
									</span>
								</div>
				      </div>
				    </div>
				  </fieldset>
				</form>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="<?php echo JS ?>/jQuery.js"></script>
	<script type="text/javascript" src="<?php echo JS ?>/bootstrap.js"></script>
	<script type="text/javascript" src="<?php echo JS ?>/styles.js"></script>
	<script type="text/javascript" src="<?php echo JS ?>/bootstrap-slider.js"></script>
	<script type="text/javascript" src="<?php echo JS ?>/bootstrap-colorpicker.js"></script>
</body>
</html>