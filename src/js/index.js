$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
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

document.addEventListener("DOMContentLoaded", function () {
  const card1 = document.querySelector('.timeline .event-1');
  const card2 = document.querySelector('.timeline .event-2');
  const card3 = document.querySelector('.timeline .event-3');
  const card4 = document.querySelector('.timeline .event-4');
  const card5 = document.querySelector('.timeline .event-5');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(card1);
  observer.observe(card2);
  observer.observe(card3);
  observer.observe(card4);
  observer.observe(card5);
});
