import { updateUI } from './updateUI';

function handleSubmit(event) {
  event.preventDefault();

  const type = document.querySelector('input[name=type]:checked').value;
  const input = encodeURIComponent(document.getElementById('input-text').value);

  fetch(`http://localhost:8080/nlp/${type}&${input}`)
    .then((res) => res.json())
    .then((data) => {
      updateUI(data.data);
    });
}

export default handleSubmit;
