const processScoreTag = (scoreTag) => {
  let score;
  switch (scoreTag) {
    case 'P':
      score = 'P (positive)';
      break;
    case 'P+':
      score = 'P+ (strong positive)';
      break;
    case 'N':
      score = 'N (negative)';
      break;
    case 'N+':
      score = 'N+ (strong negative)';
      break;
    case 'NEU':
      score = 'NEU ( neutral)';
      break;
    case 'NONE':
      score = 'NONE ( without polarity)';
      break;
    default:
      score = 'NONE ( without polarity)';
      break;
  }
  return score;
};

const assignColorClass = (data, isInteger = false) => {
  if (isInteger) {
    if (parseInt(data, 10) >= 50) return 'positive';
    return 'negative';
  }
  if (
    ['IRONIC', 'SUBJECTIVE', 'DISAGREEMENT', 'N+'].findIndex(
      (el) => el === data
    ) !== -1
  ) {
    return 'strong_negative';
  }
  if (['N'].findIndex((el) => el === data) !== -1) {
    return 'negative';
  }

  if (
    ['NONIRONIC', 'OBJECTIVE', 'AGREEMENT', 'P'].findIndex(
      (el) => el === data
    ) !== -1
  ) {
    return 'positive';
  }

  if (['P+'].findIndex((el) => el === data) !== -1) {
    return 'strong_positive';
  }

  if (['NEU', 'NONE'].findIndex((el) => el === data) !== -1) {
    return 'neutral';
  }
};

const createTagCloud = (data) => {
  //regex to filter out "Parts of speech" from Api responce
  const regex = /(@.*)/gu;

  const tagCloud = data.sentence_list.map((el) => {
    const segmentList = el.segment_list;
    const polarity = segmentList.map((elem) =>
      elem.polarity_term_list.map((element) => {
        const scoreTag = assignColorClass(element.score_tag);

        let conseptList = [];
        let isTopic = false;
        if ('sentimented_concept_list' in element) {
          conseptList = element.sentimented_concept_list.map(
            (elmnt) => elmnt.form
          );
          isTopic = true;
        }
        const uniqueConcepts = [...new Set(conseptList)];
        const keyword = element.text.replace(regex, '');
        const text = `${keyword} ${uniqueConcepts.join(' ')}`;

        return {
          text: text,
          scoreTag,
          isTopic,
          scoreTagDescription: processScoreTag(element.score_tag),
          id: `${Math.floor(Math.random() * 10000)}-${new Date()
            .getTime()
            .toString()}`,
        };
      })
    );
    return polarity.flat(1);
  });

  let entityCloud = null;
  if (
    'sentimented_entity_list' in data &&
    data.sentimented_entity_list.length > 0
  ) {
    entityCloud = data.sentimented_entity_list.map((el) => ({
      form: el.form,
      type: el.type,
      scoreTag: assignColorClass(el.score_tag),
      scoreTagDescription: processScoreTag(el.score_tag),
    }));
  }

  const score = processScoreTag(data.score_tag);

  const uniqueTagCloud = [...new Set(tagCloud.flat(1))]
    //limit to 50 tags
    .splice(0, 50);
  const tagCloudHTML = uniqueTagCloud
    .map(
      (el) =>
        `<span onclick="return Client.scrollToId('${el.id}')" class="${el.scoreTag}">${el.text}</span>`
    )
    .join('');

  //Get Topics from api data
  let topicsHTML = '';
  const topics = uniqueTagCloud.filter((el) => el.isTopic === true);
  if (topics.length > 0) {
    topicsHTML = `<hr><div class="topics"><div>Topics determined</div><div>Sentiment Score</div>${topics
      .map(
        (el) =>
          `<span id="${el.id}" class="${el.scoreTag}">${el.text}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }

  //Get Keywords from api data
  let keywordsHTML = '';
  const keywords = uniqueTagCloud.filter((el) => el.isTopic === false);
  if (keywords.length > 0) {
    keywordsHTML = `<hr><div class="keywords"><div>Keywords detected</div><div>Sentiment Score</div>${keywords
      .map(
        (el) =>
          `<span id="${el.id}"class="${el.scoreTag}">${el.text}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }

  //Get Entities from api data
  let entityCloudHTML = '';
  if (entityCloud) {
    entityCloudHTML = `<hr><div class="grey_heading entity_heading"><span>Entities mentioned</span><span>Type</span><span>Sentiment Score</span></div><div class="entities">${entityCloud
      .map(
        (el) =>
          `<span class="${el.scoreTag}">${el.form}</span><span>${el.type}</span><span class="${el.scoreTag}">${el.scoreTagDescription}</span>`
      )
      .join(' ')}</div>`;
  }

  return { tagCloudHTML, score, topicsHTML, keywordsHTML, entityCloudHTML };
};

const updateUI = (data) => {
  //Clear previous results
  const results = document.getElementById('results');
  results.innerHTML = '';
  results.style.display = 'block';
  let resultsHTML;
  if (data.status.code === '0') {
    const tagCloud = createTagCloud(data);
    resultsHTML = `
              <hr>
              <section>
                  <div class="results_header">  
                    <div class="grey_heading content_heading">Content</div>
                    <div class="grey_heading tag_cloud_heading">Tag Cloud</div>
                    <div class="original_document">${data.sentence_list
                      .map((el) => el.text)
                      .join(' ')
                      //limit to 500 words
                      .split(' ')
                      .splice(0, 500)
                      .join(' ')}
                    </div>
                    <div class="tagCloud">${tagCloud.tagCloudHTML}</div>
                  </div>
                  <hr>
                  <div class="grey_heading">Score</div>
                  <div class="results_score">
                    <div class="score_tag">This document is: <span class=${assignColorClass(
                      data.score_tag
                    )}>${tagCloud.score}</span>                   
                  </div>
                  <div class="score_range">
                      <div class="score_range_text">Score Range</div>
                      <div>
                          <div class="scores_names"><span class="strong_negative">negative</span> <span class="neutral">neutral</span><span class="positive">positive</span></div>
                            <div class="container">
                              <div class="progress2">
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
                    ${tagCloud.entityCloudHTML}                
                    ${tagCloud.topicsHTML}
                    ${tagCloud.keywordsHTML}
                    <hr>
                  <div>
                </section>`;
  } else {
    resultsHTML = `
                <div>
                <h1>Sorry!</h1>
                <i class="fas fa-car-crash"></i>
                <p>${data.status.msg}</p>
                <p>(error code${data.status.code})</p>
                </div>`;
  }

  //add resultsHTML to DOM
  results.innerHTML = resultsHTML;

  results.scrollIntoView();
};

export { updateUI, processScoreTag, assignColorClass, createTagCloud };
