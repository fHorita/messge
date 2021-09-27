'use strict'

{
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  window.addEventListener('scroll', () => {
    if (72 < window.scrollY) {
      menuBtn.classList.add('show');
    } else {
      menuBtn.classList.remove('show');
    }
  });

  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('.carousel > ul');
  const slides = ul.children;
  const dots = [];
  const carouselShow = document.getElementById('carouselShow');
  let currentIndex = 0;

  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if (currentIndex === 0) {
      prev.classList.add('hidden');
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const carouselNav = document.getElementById('carouselNav');
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
      carouselNav.appendChild(button);
    }

    dots[0].classList.add('current');
  }

  function updateDots() {
    dots.forEach(dot => {
      dot.classList.remove('current');
    });
    dots[currentIndex].classList.add('current');
  }

  let timeoutId;

  function slideShow() {
    timeoutId = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        next.click();
      } else {
        dots[0].click();
      }
      slideShow();
    }, 3000);
  }

  updateButtons();
  setupDots();

  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });

  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  let isShowing = false;
  carouselShow.addEventListener('click', () => {
    if (isShowing === false) {
      slideShow();
      carouselShow.textContent = 'PAUSE';
    } else {
      clearTimeout(timeoutId);
      carouselShow.textContent = 'SHOW';
    }
    isShowing = !isShowing;
  });

  window.addEventListener('resize', () => {
    moveSlides();
  });



}