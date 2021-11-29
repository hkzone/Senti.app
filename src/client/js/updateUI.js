import resultHTMLComponent from './resultComponent';

// Function to update user interface with a results of analysis
const updateUI = (data) => {
  //Clear previous results
  const results = document.getElementById('results');
  results.innerHTML = '';
  results.style.display = 'block';
  let resultsHTML;
  if (data.status.code === '0') {
    resultsHTML = resultHTMLComponent('success', data);
  } else {
    resultsHTML = resultHTMLComponent('error', data);
  }

  //add resultsHTML to DOM
  results.innerHTML = resultsHTML;

  results.scrollIntoView();
};

export default updateUI;
