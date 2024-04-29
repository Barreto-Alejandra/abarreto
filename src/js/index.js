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
  constructor(sectionSelector) {
    this.section = document.querySelector(sectionSelector);
    this.initObserver();
  }

  initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.section);
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
  const heroAnimation = new HeroAnimation('.hero');
  const fadeInElements = new FadeInOnScroll('.fadeIn');
  const gridAnimation = new GridAnimation('.projects__grid--item', { threshold: 0.4 });
});



////////////////////
// Copyright
////////////////////
window.SayMyName = function () {
  console.log(`%c
                                                        
                MADE WITH TOO MUCH SKILLS:              
                                                        
                                                        
       333333    666    00000  PPPPPP  MM    MM IIIII   
          3333  66     00   00 PP   PP MMM  MMM  III    
         3333  666666  00   00 PPPPPP  MM MM MM  III    
           333 66   66 00   00 PP      MM    MM  III    
       333333   66666   00000  PP      MM    MM IIIII   
                                                        
                                                        
                    https://360pmi.com/                 
`, 'background: #e8404b; color: white');
}

////////////////////
// IE Detecter
////////////////////

/* Sample function that returns boolean in case the browser is Internet Explorer*/

const isIE = () => {
  var ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  
  return is_ie; 
}
const checkIeCookie = (name) => {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}

/* Create an alert to show if the browser is IE or not */
if (isIE() && !checkIeCookie('ie_cookie')){

    const container = document.createElement('div');
    container.classList.add('ie-notification');

    container.innerHTML = `
      <p>Your web browser (Internet Explorer) is out of date. Please update your browser for more security, speed, and for the best experience on this site.</p>
      <div>
      <div>
        <a href="https://browsehappy.com/" target="_blank">Update my browser</a>
        <button class="ignore-update">Ignore</button>
      </div>
    `
    document.body.appendChild(container);

    const ignoreUpdate = document.querySelector('.ignore-update');
    ignoreUpdate.addEventListener('click', (e) => {
      var d = new Date();
        
      d.setTime(d.getTime() + (1*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "ie_cookie" + "=" + 1 + ";" + expires + ";path=/";
      container.style.display = 'none';
    });
}


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