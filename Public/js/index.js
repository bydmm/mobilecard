!function ($) {
  $(window).on('load', function () {
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
      
      $('a.custombtn').animate(
        {
          'height': width + 'px',
          'line-height': width + 'px',
          'font-size': width/4 + 'px'
        },
        '1',
        'swing'
      );
    }

    function setCookie(cookieName, value, expiredays){
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = cookieName + "=" + escape(value) 
        + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }

    function getCookie(cookieName) {
      var cookieString = document.cookie;
      var start = cookieString.indexOf(cookieName + '=');
      // 加上等号的原因是避免在某些 Cookie 的值里有
      // 与 cookieName 一样的字符串。
      if (start == -1) // 找不到
        return null;
      start += cookieName.length + 1;
      var end = cookieString.indexOf(';', start);
      if (end == -1) return unescape(cookieString.substring(start));
      return unescape(cookieString.substring(start, end));
    }

    var ismark = getCookie('ismark');

    if (!ismark) {
      $('.mark').show();
      $('#close').click(function(){
        setCookie('ismark', 1, 7);
        $('.mark').hide();
      });
    } 
  });
}(window.jQuery);