(function(){
  var initslider = function(){
    $('.slider').slick({
      autoplay:true,
      arrows: false,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true
    });
  };
  initslider();
})();