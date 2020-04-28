import '../styles/index.sass';
import './pace.min.js';
import gsap from 'gsap';
import barba from '@barba/core';

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 1,
    transformOrigin: 'top left',
    stagger: 0.2,
  });
  tl.to('ul.transition li', {
    duration: 0.5,
    scaleX: 0,
    transformOrigin: 'top left',
    stagger: 0.1,
    delay: 0.1,
  });
}

function contentAnimation() {
  gsap.from('main', {
    duration: 0.2,
    y: 30,
    autoAlpha: 0,
    delay: 0.5,
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,

  to: {
    namespace: ['home'],
  },

  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter({ current, next, trigger }) {
        contentAnimation();
      },

      async once({ current, next, trigger }) {
        console.log(next.namespace);
        contentAnimation();
      },
    },
  ],
});

// SLIDER
const tabButtons = document.querySelectorAll('.tab-button');
// tabButtons.forEach((e) => e.addEventListener('click', newTab));

function newTab(e) {
  e.currentTarget.classList.add('tab-button--active');
}

var heroTl = gsap.timeline();
let progress = 0;

function slide(from, to) {
  const step = 115;
  progress = progress - step;

  heroTl.to('.slide-progress__current', {
    width: '100%',
    duration: 3,
    ease: 'power1.inOut',
  });

  heroTl.to(from, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power1.inOut',
    onComplete: showNextTab,
  });

  heroTl.to('.hero-image', {
    x: `${progress}%`,
    stagger: 0.4,
    duration: 1.2,
    ease: 'power4.inOut',
  });

  heroTl.to(to, {
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power1.inOut',
  });

  heroTl.to(
    '.slide-progress__current',
    {
      width: '0%',
      duration: 0.3,
      ease: 'power1.inOut',
    },
    '-=1.7'
  );

  // heroTl.
  // .classList.add('tab-button--active');

  heroTl.to('.slide-progress__current', {
    width: '100%',
    duration: 3,
    ease: 'power1.inOut',
  });
}

slide('.hero-letter:nth-of-type(1)', '.hero-letter:nth-of-type(2)');
slide('.hero-letter:nth-of-type(2)', '.hero-letter:nth-of-type(3)');

let currentTab = 0;
function showNextTab() {
  currentTab++;
  tabButtons.forEach((e) => e.classList.remove('tab-button--active'));
  tabButtons[currentTab].classList.add('tab-button--active');
}

// gsap.to('.tab-button:first-of-type', {
//   borderWidth: 0,
//   duration: 0.3,
//   delay: 1,
// });
