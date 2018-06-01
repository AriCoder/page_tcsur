(function(){
  var controllerHeader=function(){
    var elementSlide=$('#seccion-scroll').offset().top-83,
        headerPage=$('header'),
        classHeader='fixed-header';
    window.addEventListener('scroll', function(){
      if($(window).scrollTop()>=elementSlide){
        headerPage.addClass(classHeader);
      }else{
        headerPage.removeClass(classHeader);
      }
    });


  };
  controllerHeader();
})();