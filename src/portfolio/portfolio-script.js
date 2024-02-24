document.addEventListener("DOMContentLoaded", function () {
  const card1 = document.querySelector('.project-item .card-1');
  const card2 = document.querySelector('.project-item .card-2');
  const card3 = document.querySelector('.project-item .card-3');

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
});

// scroll to top of page on refresh
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// for landing page arrow click
$(document).ready(function () {
  $('#down').on('click', function () {
    $('html, body').animate({
      scrollTop: $('#start').offset().top
    }, 500);
  });
});