(function(){
  var initslider = function(){
    $('.slider').slick({
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true
    });
  };
  initslider();
})();