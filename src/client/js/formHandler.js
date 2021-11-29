import { isWebUri } from 'valid-url';
import updateUI from './updateUI';
import defaultData from './data/data';

//Sets default messages for the text input
const setDefaultMessage = (type = 'txt') => {
  const msgField = document.querySelector('#message');
  if (type === 'txt')
    msgField.textContent =
      'Please enter your text for analysis or use test one.';
  else msgField.textContent = 'Please enter your url';
};

//function to display error messages in form
const showErrorMessage = (msg) => {
  const msgField = document.querySelector('#message');
  msgField.textContent = msg;
  msgField.classList.toggle('error');
  setTimeout(() => {
    setDefaultMessage();
    msgField.classList.toggle('error');
  }, 3000);
};

// Show error message if maximum allowed length of text is reached
const checkTextareaMaxLength = () => {
  const txtArea = document.querySelector('.search_form textarea');
  txtArea.addEventListener('keyup', () => {
    const stringLength = txtArea.value.length;
    const maxLength = parseInt(txtArea.getAttribute('maxlength'), 10);
    if (stringLength >= maxLength) {
      showErrorMessage(
        `The maximum number of characters allowed is ${maxLength}`
      );
    }
  });
};

//set random default text for input
const setRandomDefaultText = (clear = false) => {
  if (clear) document.getElementById('input-text').value = '';
  else {
    const randomIndex = Math.floor(Math.random() * defaultData.length);
    document.getElementById('input-text').value = defaultData[randomIndex];
  }
};

//update default message depending on type of radio button selected
const handleInputTypeSelector = () => {
  const url = document.querySelector('#url');
  url.addEventListener('change', () => {
    setDefaultMessage('url');
    setRandomDefaultText(true);
  });
  const txt = document.querySelector('#text');
  txt.addEventListener('change', () => {
    setDefaultMessage('txt');
    setRandomDefaultText();
  });
};

//function to handle form submit events
const handleSubmit = async (event) => {
  event.preventDefault();

  const type = document.querySelector('input[name=type]:checked').value;
  const input = document.getElementById('input-text').value;

  //Check if text is sufficient length
  if (type === 'txt' && input.length <= 5) {
    showErrorMessage('Please enter text with more then 5 characters');
    return;
  }

  //check if url is formatted to URI standard
  if (type === 'url' && !isWebUri(input)) {
    showErrorMessage('Please enter complete and valid url address');
    return;
  }

  //fetch data from the server
  try {
    const res = await fetch(
      `http://localhost:8080/nlp/${type}&${encodeURIComponent(input)}`
    );
    const data = await res.json();
    updateUI(data.data);
  } catch (err) {
    showErrorMessage(err);
  }
};

export {
  handleSubmit,
  setDefaultMessage,
  checkTextareaMaxLength,
  handleInputTypeSelector,
  setRandomDefaultText,
};
