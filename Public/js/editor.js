KindEditor.ready(function(K) {
  //tel plugin

  var editoritems = [
        'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
        'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist',
        'insertunorderedlist', '|', 'emoticons', 'image', 'link', '|', 'tel', 'email'];
  KindEditor.lang({
    tel : 'Insert Tel',
    tel_label : 'Tel',
    email : 'Insert Mail',
    email_label : 'Mail',
  }, 'en');
  
  KindEditor.plugin('tel', function(K) {
    var self = this, name = 'tel';
    self.clickToolbar(name, function() {
      var lang = self.lang(name + '.'),
        html = '<div style="padding:20px;">' +
          //url
          '<div class="ke-dialog-row">' +
          '<label for="tel" style="width:60px;">' + self.lang("tel_label") + '</label>' +
          '<input class="ke-input-text" type="text" id="tel" name="tel" value="" style="width:260px;" /></div>',
        dialog = self.createDialog({
          name : name,
          width : 450,
          title : self.lang(name),
          body : html,
          yesBtn : {
            name : self.lang('yes'),
            click : function(e) {
              var telnumber = telinput.val(),
                html = '<a href="tel://'+ telnumber +'">' + telnumber + '</a> ';
              self.insertHtml(html).hideDialog().focus();
            }
          }
        }),
        telinput = K('#tel', dialog.div);
      telinput.focus();
    });
  });

  KindEditor.plugin('email', function(K) {
    var self = this, name = 'email';
    self.clickToolbar(name, function() {
      var lang = self.lang(name + '.'),
        html = '<div style="padding:20px;">' +
          //url
          '<div class="ke-dialog-row">' +
          '<label for="email" style="width:60px;">' + self.lang("email_label") + '</label>' +
          '<input class="ke-input-text" type="email" id="email" name="email" value="" style="width:260px;" /></div>',
        dialog = self.createDialog({
          name : name,
          width : 450,
          title : self.lang(name),
          body : html,
          yesBtn : {
            name : self.lang('yes'),
            click : function(e) {
              var email = emailinput.val(),
                html = '<a href="mailto:'+ email +'">' + email + '</a> ';
              self.insertHtml(html).hideDialog().focus();
            }
          }
        }),
        emailinput = K('#email', dialog.div);
      emailinput.focus();
    });
  });
  
  
  var upload = K.editor({
    allowFileManager : true,
    langType : 'en'
  });
  K('#drag-images').click(function() {
    upload.loadPlugin('image', function() {
      upload.plugin.imageDialog({
        showRemote : false,
        imageUrl : K('#icon_url').val(),
        clickFn : function(url, title, width, height, border, align) {
          K('#icon_url').val(url);
          $('#drag-images').html('<img class="icon" src="'+url+'"/>');
          site['icon'] = url;
          upload.hideDialog();
        }
      });
    });
    return false;
  });
  
  //pagetitle
  $("#pagetitle").val(site['title']);
  $("#pagetitle").keyup(function(){
    var title = $(this).val();
    site['title'] = title;
  });
  
  //define var
  var preview = false;
  
  Intialize();
  //旋转重构  
  var supportsOrientationChange = "onorientationchange" in window,  
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";  
  if(window.addEventListener){
    window.addEventListener(orientationEvent, function(){
      setTimeout(Intialize,100);
    }, false);
   }else{
     window.attachEvent(orientationEvent,function(){
       setTimeout(Intialize,100);
     });
   }
  
  function Intialize(){
    var width = $('a.custombtn').width();
    
    $('.preview a.custombtn').css({
      'height': width + 'px',
      'line-height': width + 'px',
      'font-size': width/4 + 'px'
    });
    
    $('.preview .block').css({
      'height': width + 'px'
    });
    
  }
  var formtabs = $('.formtabs');
  function showFormTabs(tabid){
    formtabs.each(function(){
      if( tabid == $(this).attr('id') ){
        $(this).show(300);
      }else{
        $(this).hide(300);
      }
    });
  }
  
  $('.preview .header').click(function(){
    showFormTabs('headfrom');
    headerEditorHandle();
    $('.gradient').removeClass('gradient');
    $(this).addClass('gradient');
  });
  
  // $('.preview .header').click();

  function headerEditorHandle()
  {
    var headereditor = KindEditor.create('#header', {
      width : '100%',
      minHeight : '200px',
      resizeType : 0,
      allowPreviewEmoticons : false,
      allowImageUpload : true,
      fillDescAfterUploadImage: true,
      langType : 'en',
      items : editoritems,
      afterChange : function() {
        this.sync();
        var content = this.html();
        $('.preview .header .content').html(content)
        site['header'] = content;
      }
    });
  }
  
  $('.preview .footer').click(function(){
    showFormTabs('footerform');
    footerEditorHandle();
    $('.gradient').removeClass('gradient');
    $(this).addClass('gradient');
  });
  
  function footerEditorHandle()
  {
    var footereditor = KindEditor.create('#footer', {
      width : '100%',
      minHeight : '200px',
      resizeType : 0,
      allowPreviewEmoticons : false,
      allowImageUpload : false,
      langType : 'en',
      items : editoritems,
      afterChange : function() {
        this.sync();
        var content = this.html();
        $('.preview .footer').html(content)
        site['footer'] = content;
      }
    });
  }

  $('.preview .mark .content').click(function(){
    showFormTabs('markform');
    markEditorHandle();
    $('.gradient').removeClass('gradient');
    $(this).addClass('gradient');
  });

  function markEditorHandle()
  {
    var markeditor = KindEditor.create('#mark', {
      width : '100%',
      minHeight : '200px',
      resizeType : 0,
      allowPreviewEmoticons : false,
      allowImageUpload : true,
      fillDescAfterUploadImage: true,
      langType : 'en',
      items : editoritems,
      afterChange : function() {
        this.sync();
        var content = this.html();
        $('.preview .mark .content').html(content)
        site['mark'] = content;
      }
    });
  }
  
  $('a.custombtn').live('click', function(){
    return preview;
  });
  
  $('a.custombtn').live('click', function(){
    showFormTabs('blockfrom');  
    var self = $(this); 
    $('.gradient').removeClass('gradient');
    self.addClass('gradient');
    reloadForm(self);
  });

  
  function RenderLink() //根据当前block的link类型，渲染表单
  {
    //editor-link
    var link = currentBlock.link;
    var linkType = 'hyperlink'; //link type select option val
    var inputType = 'text'; //
    
    $('.editor-link').val('');
    
    if(link.match(/^http(s)?:\/\/maps.google/)){
      handleMap();
    }else if(link.match(/^tel:\/\//)){
      handleTel();
    }else if(link.match(/^http(s)?:\/\//)){
      handlehyperlink();
    }else if(link.match(/^mailto:/)){
      handleMail();
    }else if(link.match(/#summery/)){
      handleSummery();
    };
    
    $('#link-type').val(linkType);
    $(".editor-link").prop('type',inputType);
    
    function handleTel()
    {
      linkType = 'tel';
      link = link.replace(/^tel:\/\//, '');
      showLinkAndHideEidtor();
      $('.editor-link').val(link);
    }
    
    function handlehyperlink()
    {
      linkType = 'hyperlink';
      inputType = 'url'
      showLinkAndHideEidtor();
      $('.editor-link').val(currentBlock.link);
    }
    
    function handleMail()
    {
      linkType = 'mail';
      inputType = 'email'
      link = link.replace(/^mailto:/, '');
      showLinkAndHideEidtor();
      $('.editor-link').val(link);
    }
    
    function handleMap()
    {
      linkType = 'map';
      inputType = 'url'
      showLinkAndHideEidtor();
      $('.editor-link').val(link);
    }
    
    function handleSummery()
    {
      linkType = 'summery';
      HideLinkAndShowEidtor();
      KindEditorHandle();
    }
    
  }
  // 当用户输入或者改变链接类型的时候重新渲染表单，以及保存到JSON中去
  function LinkChangeHandle()
  {
    $('#link-type').change(function(){
      link_helper($(this).val());
    });
    $(".editor-link").keyup(function(){
      var prefix = link_helper($('#link-type').val());
      var link = $(this).val();
      $('#'+currentBlockIndex).attr('href', link);
      console.log(prefix + link);
      currentBlock.link = prefix + link;
      storeBlocks();
    });
  }
  
  function link_helper(linkType)
  {
    var prefix = '';
    var inputType = 'text';
    switch(linkType){
      case 'tel':
        prefix = "tel://";
        showLinkAndHideEidtor();
        break;

      case 'hyperlink':
        inputType = 'url';
        showLinkAndHideEidtor();
        break;

      case 'mail':
        inputType = 'email';
        prefix = "mailto:";
        showLinkAndHideEidtor();
        break;

      case 'map':
        inputType = 'url';
        showLinkAndHideEidtor();
        break;

      case 'summery':
        HideLinkAndShowEidtor();
        KindEditorHandle();
        break;
    }
    $(".editor-link").attr('type',inputType);
    return prefix;
  }
  var help;
  
  function KindEditorHandle()
  {
    $('#content').val(currentBlock.summery);
    help = K.create('#content', {
      width : '100%',
      minHeight : '200px',
      resizeType : 0,
      allowPreviewEmoticons : false,
      allowImageUpload : false,
      langType : 'en',
      items : editoritems,
      afterChange : function() {
        //this.sync();
        var content = this.html();
        currentBlock.summery = content;
        currentBlock.link = "#summery-" + currentBlock.id;
        storeBlocks();
      }
    });
    
  }
  
  function editorLinkHandle()
  { 
    RenderLink();
    LinkChangeHandle();
  }
  
  function showLinkAndHideEidtor()
  {
    $('.content-group').hide(300);
    $('.link-group').show(300);
  }
  
  function HideLinkAndShowEidtor()
  {
    $('.content-group').show(300);
    $('.link-group').hide(300);
  }
  
  function editorTitleHandle()
  {
    $('.editor-title').val(currentBlock.title);
    $(".editor-title").keyup(function(){
      var title = $(this).val();
      $('#'+currentBlockIndex).html(title);
      currentBlock.title = title;
      storeBlocks();
    });
  }
  
  function editorBorderRadiuseHandle()
  {
    var radius = parseInt(currentBlock.border_radius);
    
    $("#editor-border-radius").slider({
      'min': "0",
      "max": "50",
      'value': radius
    }).on('slide', function(ev){
      var border_radius = ev.value;
      $('#'+currentBlockIndex).css({'border-radius': border_radius+"%"});
      currentBlock.border_radius = border_radius;
      storeBlocks();
    });
  }
  
  function colorpickerHandle()
  {
    //colorpicker
    $('.editor-background-color #colorpicker').attr({'data-color': currentBlock.background_color });
    $('.editor-background-color #colorpicker .input-medium').val(currentBlock.background_color);
    $('.editor-background-color i').css({'background-color': currentBlock.background_color });
    $('#colorpicker').colorpicker({
    }).on('changeColor', function(ev){
      var background_color = ev.color.toHex();
      $('#'+currentBlockIndex).css({'background-color': background_color });
      currentBlock.background_color = background_color;
      storeBlocks();
    });

    $('.editor-background-color #colorpicker .input-medium').change(function(){
      var color = $(this).val();
      $('.editor-background-color i').css({'background-color': color});
      $('#'+currentBlockIndex).css({'background-color': color });
      currentBlock.background_color = color;
      storeBlocks();
    });

  }

  function titleColorpickerHandle()
  {
    //colorpicker
    $('.editor-title-color #colorpicker').attr({'data-color': currentBlock.title_color });
    $('.editor-title-color #titlecolorpicker .input-medium').val(currentBlock.title_color);
    $('.editor-title-color i').css({'background-color': currentBlock.title_color });
    $('#titlecolorpicker').colorpicker({
    }).on('changeColor', function(ev){
      var title_color = ev.color.toHex();
      $('#'+currentBlockIndex).css({'color': title_color });
      currentBlock.title_color = title_color;
      storeBlocks();
    });

    $('.editor-title-color #titlecolorpicker .input-medium').change(function(){
      var title_color = $(this).val();
      $('.editor-title-color i').css({'color': title_color});
      $('#'+currentBlockIndex).css({'color': title_color });
      currentBlock.title_color = title_color;
      storeBlocks();
    });

  }

  
  function editorFontFamilyHandle()
  {
    //editor-font-family
    $('#editor-font-family').val(currentBlock.font_family);
    $('#editor-font-family').change(function(){
      var font_family = $(this).val();
      currentBlock.font_family  = font_family;
      $('#'+currentBlockIndex).css({'font-family': font_family });
      storeBlocks();
    });
  }
  
  //form
  function reloadForm(self)
  { 
    K.remove('#content');
    
    currentBlockIndex = self.attr('id');
    findBlock(currentBlockIndex);
    
    //reload form handle
    editorTitleHandle();
    editorLinkHandle();
    editorBorderRadiuseHandle();
    colorpickerHandle();
    titleColorpickerHandle();
    editorFontFamilyHandle();
    
  }
    
  $('#block-remove').popover({
    'title': 'Caution',
    'trigger': 'hover',
    'html': true,
    'placement': 'top',
    'content': '<div>It will remove this block!</div>'
  });
  
  $('#block-remove').modal({
      backdrop: true,
      keyboard: true,
      show: false
  });
    
  function findBlock(id)
  {
    $(blocks).each(function(){
      if(this.id == id){
        currentBlock = this;
        return this;
      }
    });
  }
  
  //可用么
  function storeBlocks()
  {
    for(var i=0; i<blocks.length; i++)
    {
      if(blocks[i].id == currentBlock.id){
        blocks[i] = currentBlock;
        return 1;
      }
    }
  }
  
  $('#saveSite').click(function(){
    var loading = true;
    $('#myModal').modal({
      keyboard: false
    }).on('hide', function(){
      if(loading){
        return false;
      }
    });
    
    $.ajax({ 
      url : "index.php?a=saveSite",
      data : {
        "blocks" : blocks,
        "site" : site
      },
      dataType : "json",
      type : "POST",
      success: function(){
        loading = false;
        $('#myModal').modal('hide');
        savesuccess();
      },
      error: function(){
        loading = false;
        $('#myModal').modal('hide');
        saveerror();
      }
    });
  });
  
  function savesuccess(){
    $('.alert-error').hide();
    $('.alert-success').show();
  }
  
  function saveerror(){
    $('.alert-success').hide();
    $('.alert-error').show();
  }
  
});