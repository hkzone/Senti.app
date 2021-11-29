import { assignColorClass, processApiData } from './apiDataHandler';

//LIMIT to 1000 words display of original document
const wordsLimit = 1000;

// HTML component to display Tags
const tagCloudHTML = ({ uniqueTags }) =>
  uniqueTags
    .map(
      (el) =>
        `<span onclick="return Client.scrollToId('${el.id}')" class="${el.scoreTag}">${el.text}</span>`
    )
    .join('');

// HTML component to display Entities
const entityCloudHTML = ({ entities }) => {
  if (entities) {
    return `<hr><div class="grey_heading entity_heading"><span>Entities mentioned</span><span>Type</span><span>Sentiment Score</span></div><div class="entities">${entities
      .map(
        (el) =>
          `<span class="${el.scoreTag}">${el.form}</span><span>${el.type}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }
  return '';
};

// HTML component to display Topics
const topicsHTML = ({ topics }) => {
  if (topics.length > 0) {
    return `<hr><div class="topics"><div>Topics determined</div><div>Sentiment Score</div>${topics
      .map(
        (el) =>
          `<span id="${el.id}" class="${el.scoreTag}">${el.text}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }
  return '';
};

// HTML component to display Keywords
const keywordsHTML = ({ keywords }) => {
  if (keywords.length > 0) {
    return `<hr><div class="keywords"><div>Keywords detected</div><div>Sentiment Score</div>${keywords
      .map(
        (el) =>
          `<span id="${el.id}"class="${el.scoreTag}">${el.text}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }
  return '';
};

// HTML component to display results of analysis
const resultHTMLComponent = (status, data) => {
  if (status === 'success') {
    const apiData = processApiData(data);
    return `        <hr>
              <section>
                  <div class="results_header">  
                    <div class="grey_heading content_heading">Content</div>
                    <div class="grey_heading tag_cloud_heading">Tag Cloud</div>
                    <div class="original_document">${data.sentence_list
                      .map((el) => el.text)
                      .join(' ')
                      //limit number of words to wordsLimit
                      .split(' ')
                      .splice(0, wordsLimit)
                      .join(' ')}
                    </div>
                    <div class="tagCloud">${tagCloudHTML(apiData)}</div>
                  </div>
                  <hr>
                  <div class="grey_heading">Score</div>
                  <div class="results_score">
                    <div class="score_tag">This document is: <span class=${assignColorClass(
                      data.score_tag
                    )}>${apiData.score}</span>                   
                  </div>
                  <div class="score_range">
                      <div class="score_range_text">Score Range</div>
                      <div>
                          <div class="scores_names"><span class="strong_negative">negative</span> <span class="neutral">neutral</span><span class="positive">positive</span></div>
                            <div class="progress-container">
                              <div class="progress">
                                <div class="progress_bar_${assignColorClass(
                                  data.score_tag
                                )}"></div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <hr>
 <div class="grey_heading">Results of the analysis</div>
                  <div class="subjectivity">Subjectivity: <span class=${assignColorClass(
                    data.subjectivity
                  )}>${data.subjectivity.toLowerCase()}</span><br>
                    The different sentiments of the document are in <span class=${assignColorClass(
                      data.agreement
                    )}>${data.agreement.toLowerCase()}</span>
                    
                    <br>
                    Irony: <span class=${assignColorClass(
                      data.irony
                    )}>${data.irony.toLowerCase()}</span>
                    <br>
                    We are <span class=${assignColorClass(
                      data.confidence,
                      true
                    )}>${data.confidence.toLowerCase()}%</span> confident about these results
                  </div>
                  <div class="detailed_info">
                    ${entityCloudHTML(apiData)}                
                    ${topicsHTML(apiData)}
                    ${keywordsHTML(apiData)}
                    <hr>
                  <div>
                </section>`;
  }
  // return if status was not "success"
  return `
                <div class='error_container panel'>
                <h3>Sorry!</h3>
                <object data='./assets/exclamation-triangle.svg'></object>
                <p>${data.status.msg}</p>
                </div>`;
};

export default resultHTMLComponent;
