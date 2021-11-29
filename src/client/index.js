/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import {
  handleSubmit,
  setDefaultMessage,
  checkTextareaMaxLength,
  handleInputTypeSelector,
  setRandomDefaultText,
} from './js/formHandler';

import { app, scrollToId } from './js/app';

import './styles/main.scss';

import './assets/exclamation-triangle.svg';
import './assets/iconmonstr-github-1.svg';
import configParticles from './assets/particles.json';
import configParticles2 from './assets/particles2.json';

//Start functionality on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', () => {
  app();
  setDefaultMessage();
  checkTextareaMaxLength();
  handleInputTypeSelector();
  setRandomDefaultText();
});

export { handleSubmit, app, scrollToId };
