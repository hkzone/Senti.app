/* eslint-disable no-undef */
import 'particles.js';
import data from './data/data';

const app = () => {
  particlesJS.load('particles-js', './assets/particles.json', () => {
    // eslint-disable-next-line no-console
    console.log('callback - particles-js config loaded');
  });
  particlesJS.load('particles-js2', './assets/particles2.json', () => {
    // eslint-disable-next-line no-console
    console.log('callback - particles-js2 config loaded');
  });
  const randomIndex = Math.floor(Math.random() * data.length);
  document.getElementById('input-text').value = data[randomIndex];
};

const scrollToId = (id) => {
  document.getElementById(id).scrollIntoView();
};

export { app, scrollToId };
