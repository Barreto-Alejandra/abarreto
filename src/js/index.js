//////////////////////////
// IMPORT CSS
//////////////////////////

/////// LIBRARIES CSS
import 'bootstrap/dist/css/bootstrap-grid.css';
/////// MAIN CSS
import '../css/style.sass';


//////////////////////////
// IMPORT LIBRARIES JS
//////////////////////////
import { gsap } from "gsap";


import Lenis from '@studio-freight/lenis'

class Navigation {
  constructor() {
    this.navToggle = document.querySelector('.nav__toggle');
    this.navList = document.querySelector('.nav__list');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.navToggle.addEventListener('click', () => {
      const expanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      this.navToggle.setAttribute('aria-expanded', String(!expanded));
      this.navList.setAttribute('aria-expanded', String(!expanded));
    });

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navList.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

class HeroAnimation {
  constructor(heroSelector) {
    this.heroSection = document.querySelector(heroSelector);
    this.img = this.heroSection.querySelector('.hero__img');
    this.heading = this.heroSection.querySelector('h1');
    this.text = this.heroSection.querySelector('.text');
    
    this.animateHero(); // Llama directamente a la animación en el constructor
  }

  animateHero() {
    // Añade la clase 'visible' para activar la animación del background y la opacidad general
    this.heroSection.classList.add('visible');

    // Usa setTimeout para retrasar la animación de la imagen, el título y el texto
    setTimeout(() => {
      this.img.style.opacity = 1;
      this.img.style.transform = 'translateY(0)';

      this.heading.style.opacity = 1;
      this.heading.style.transform = 'translateY(0)';

      this.text.style.opacity = 1;
      this.text.style.transform = 'translateY(0)';
    }, 500); // Ajusta el tiempo según prefieras
  }
}


class FadeInOnScroll {
  constructor(elementsSelector, threshold = 0.8) {
    this.elements = document.querySelectorAll(elementsSelector);
    this.threshold = threshold;
    this.lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    this.initScroll();
  }

  initScroll() {
    const raf = (time) => {
      this.lenis.raf(time);
      this.updateVisibility();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  updateVisibility() {
    this.elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * this.threshold) {
        el.classList.add('fadeInVisible');
      }
    });
  }
}


class GridAnimation {
  constructor(gridSelector, options) {
    this.gridItems = document.querySelectorAll(gridSelector);
    this.options = options;
    this.observer = null;

    this.initObserver();
  }

  initObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
         
          setTimeout(() => {
            this.animateItem(entry.target);
          }, index * 180); 
        }
      });
    }, this.options);

    this.observeItems();
  }

  animateItem(item) {
    item.classList.add('visible');
  }

  observeItems() {
    this.gridItems.forEach(item => {
      this.observer.observe(item);
    });
  }
}



////////////////////
// Run apps
////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const targetTop = window.scrollY + target.getBoundingClientRect().top - 60; 
        lenis.scrollTo(targetTop, 1000); 
      }
    });
  });

  new Navigation();
  // new HeroAnimation('.hero');
  
  const fadeInElements = new FadeInOnScroll('.fadeIn');
  const gridAnimation = new GridAnimation('.projects__grid--item', { threshold: 0.4 });
  const sliderItems = document.querySelector('.skill__slider--items');
  const clone = sliderItems.cloneNode(true);
  document.querySelector('.skill__slider').appendChild(clone);
});



////////////////////
// Keyboard focus
////////////////////

function keyboardFocus (e) {
  if (e.keyCode === 9) { // Tab key
    document.documentElement.classList.add('keyboard-focus');
  }

  document.removeEventListener('keydown', keyboardFocus, false);
}

document.documentElement.classList.remove('no-js');
document.addEventListener('keydown', keyboardFocus, false);