// returns score from api data in the form of text
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

//assign CSS class according to the value
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

// Returns overall score, lists of "tags", "keywords", "entities" from Api response
const processApiData = (data) => {
  //regex to filter out "Parts of speech" from Api responce
  const regex = /(@.*)/gu;

  //Get all Tags from api data
  const tags = data.sentence_list.map((el) => {
    const segmentList = el.segment_list;
    const polarity = segmentList.map((elem) =>
      elem.polarity_term_list.map((element) => {
        const scoreTag = assignColorClass(element.score_tag);

        //Check if the keyword has Sentimented Concepts
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

        //join keyword with Sentimented Concepts
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

  //Make array of only unique Tags
  const uniqueTags = [...new Set(tags.flat(1))]
    //limit to 50 tags
    .splice(0, 50);

  //Get all Entities from api data
  let entities = null;
  if (
    'sentimented_entity_list' in data &&
    data.sentimented_entity_list.length > 0
  ) {
    entities = data.sentimented_entity_list
      .map((el) => ({
        form: el.form,
        type: el.type.replaceAll('>', '> '),
        scoreTag: assignColorClass(el.score_tag),
        scoreTagDescription: processScoreTag(el.score_tag),
      }))
      //filter out duplicates
      .filter(
        (elm, index, arr) =>
          arr.findIndex((element) => element.form === elm.form) === index
      );
  }

  //Select Topics from tagd list
  const topics = uniqueTags.filter((el) => el.isTopic === true);

  //Select Keywords from tags list
  const keywords = uniqueTags.filter((el) => el.isTopic === false);

  //overall score of document from api data
  const score = processScoreTag(data.score_tag);

  return { uniqueTags, score, topics, keywords, entities };
};

export { processScoreTag, assignColorClass, processApiData };
