$(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 30) {
        $('.headshot').css({
          'transform': 'translateY(-100px)',
          'transition': 'transform 750ms ease-in-out' 
        });
      } else {
        $('.headshot').css({
          'transform': 'translateY(100%)',
          'transition': 'transform 1000ms ease-in-out'
        });
      }
    });
  });
  