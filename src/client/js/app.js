/* eslint-disable no-undef */
import 'particles.js';

const app = () => {
  particlesJS.load('particles-js', './assets/particles.json', () => {
    // eslint-disable-next-line no-console
    console.log('callback - particles-js config loaded');
  });
  particlesJS.load('particles-js2', './assets/particles2.json', () => {
    // eslint-disable-next-line no-console
    console.log('callback - particles-js2 config loaded');
  });
};

const scrollToId = (id) => {
  document.getElementById(id).scrollIntoView();
};

export { app, scrollToId };
