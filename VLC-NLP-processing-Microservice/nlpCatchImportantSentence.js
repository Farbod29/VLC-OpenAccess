function nlpCatchImportantSentence(htlmDom, words) {
  let strArrOrg = htlmDom.split(' ');
  let strArr = htlmDom.toLowerCase().split(' ');
  let result = {};
  for (let word of words) {
    result[word] = nlpSentencePerWord(strArrOrg, strArr, word);
  }
  let tokens = Object.keys(result);
  let pureResult = {};
  for (let token of tokens) {
    if (result[token].length > 0) {
      pureResult[token] = result[token];
    }
  }
  return pureResult;
}

//console.log(`${analyzedSentence["anal"] && analyzedSentence["anal"][0]} \n ${analyzedSentence["khiki"][1]}`);

function nlpSentencePerWord(
  arrayOfWordsOriginal,
  arrayOfWordsLower,
  selectedWord
) {
  let strArrOrg = arrayOfWordsOriginal; //str.split(" ");
  let strArr = arrayOfWordsLower; //str.toLowerCase().split(" ");
  let index = [];
  let wordForSearch = selectedWord.toLowerCase();
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i].includes(wordForSearch)) {
      index.push(i);
    }
  }
  let prepostWordsCount = 8;
  let tempArr = [];
  let tempStr = [];
  if (index.length === 0) {
    tempStr = []; // "There is not such a word!"
  } else {
    for (let wordIndex = 0; wordIndex < index.length; wordIndex++) {
      for (
        let i = index[wordIndex] - prepostWordsCount;
        i < index[wordIndex] + prepostWordsCount;
        i++
      ) {
        strArrOrg[i] !== undefined && tempArr.push(strArrOrg[i]); // if ()  !1  => fn 2
      }
      tempStr.push(
        (index[wordIndex] - prepostWordsCount <= 0 ? '' : '...') +
          tempArr.join(' ') +
          (index[wordIndex] + prepostWordsCount >= strArrOrg.length
            ? ''
            : '...')
      );
      tempArr = [];
    }
  }
  return tempStr;
}

module.exports = nlpCatchImportantSentence;
