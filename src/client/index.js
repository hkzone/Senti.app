/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import {
  handleSubmit,
  setDefaultMessage,
  checkTextareaMaxLength,
  handleInputTypeSelector,
} from './js/formHandler';

import { app, scrollToId } from './js/app';

import configParticles from './assets/particles.json';
import configParticles2 from './assets/particles2.json';

import './styles/_resets.scss';
import './styles/_variables.scss';
import './styles/_base.scss';
import './styles/_form.scss';
import './styles/_footer.scss';
import './styles/_header.scss';
import './styles/_particles.scss';
import './styles/_results.scss';
import './styles/_progressbar.scss';

import './assets/exclamation-triangle.svg';

//Call app function on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', () => {
  app();
  setDefaultMessage();
  checkTextareaMaxLength();
  handleInputTypeSelector();
});

export { handleSubmit, app, scrollToId };
