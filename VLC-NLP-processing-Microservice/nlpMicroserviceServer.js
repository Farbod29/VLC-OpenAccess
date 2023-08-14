let express = require('express');
//let fs = require('fs');
const bodyParser = require('body-parser');

let cheerio = require('cheerio');
let gramophone = require('gramophone');
let localStorage = require('node-localstorage');
let keyword_extractor = require('keyword-extractor');
let nlpCatchImportantSentence = require('./nlpCatchImportantSentence.js');
/**  cheerio documentation http://zetcode.com/javascript/cheerio/
 *
 */
let FakeWordsDictionary = [
  'fake',
  'misinformation',
  'disinformation',
  'false',
  'claim',
  'unreliable',
  'unsubstantiated',
  'denied',
  'conspiracy',
  'misleading',
  'photoshoped',
  'manipulated',
];
let JudgementWordsDictionary = [
  'statement',
  'allegation',
  'legitimation',
  'reference',
  'review',
  'official',
  'experiment',
  'photo',
  'prove',
  'In fact',
  'truth',
  'real',
];

let app = express();

let request = require('request');
const sw = require('remove-stopwords');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let Judgement = 0;
let Fake = 0;
let temp;
let CleanDomBody0;
let resJ2 = '';
let resF2 = '';

app.put('/scraperAndAnalyser', async function (req, res) {
  //console.log("Got body:", req.body.RIVurl);
  let json = {
    RIVurl: '',
    Title: '',
    Keywords: '',
    SortedKeywords: '',
    FakeClaimVector: '',
    JudgmentLiteratureVector: '',
    FakeClaimWords: '',
    JudgementLiteratureWords: '',
    image: '',
    FakeSegments: {},
    JudgementSegments: {},
  };
  json.RIVurl = req.body.RIVurl;
  request(json.RIVurl, async function (error, response, html) {
    if (!error) {
      //let $ = cheerio.load(html);
      let $ = cheerio.load(html);
      //let title, release, rating;
      let title = $('title');

      /**
       *      Get DOM data and add keywords extractor
       *
       */
      let theWholeOfDomData = '';

      $('h2, h1, p').filter(function () {
        let data1 = $(this);
        let data2 = data1.text();
        theWholeOfDomData += data2;
        removeLanguageStopwords(data2);
      });
      /**
       *    Get back important sentence
       *
       */
      const nlpCatchFakeSentenceResult = nlpCatchImportantSentence(
        theWholeOfDomData,
        FakeWordsDictionary
      );
      const nlpCatchJudgementSentencesResult = nlpCatchImportantSentence(
        theWholeOfDomData,
        JudgementWordsDictionary
      );
      json.FakeSegments = nlpCatchFakeSentenceResult;
      json.JudgementSegments = nlpCatchJudgementSentencesResult;
      /**
       *    Remove language stopwords  1
       *
       */

      function removeLanguageStopwords(text) {
        let CleanDomBody0 = remove_stopwords(text).replace(
          /<a\b[^>]*>(.*?)<\/a>/i,
          ''
        );
        let extraction_result = keyword_extractor.extract(CleanDomBody0, {
          language: 'english',
          remove_digits: true,
          return_changed_case: true,
          remove_duplicates: true,
        });
        temp = concat(extraction_result);
      }
      /**
       *     Remove language stopwords  2
       *
       */
      let temp22 = temp.replace(/,/g, ' ');
      CleanDomBody0 = temp22.split(' ');
      let CleanDomBodyRemoveStopwords = sw
        .removeStopwords(CleanDomBody0, 'all')
        .toString();
      //console.log("CleanDomBodyRemoveStopwords", CleanDomBodyRemoveStopwords);
      /**
       *     Calculate Fake Judge and gramophone
       *
       */
      let gramophoneOutput = calculateNLP(CleanDomBodyRemoveStopwords).replace(
        /30copyright/g,
        ''
      );
      let temp1 = gramophoneOutput.replace(/30copyright/g, '');
      //console.log("Response Keywords before sorting: ===== " + '\n', temp1);

      /**
       *    count Unique Words and sort them (bubble sort)
       *
       */

      let temp4 = countUniqueWords(temp1);
      /**
       *     Set sortedKeyword and keywords into Json file
       *
       */
      json.Keywords = temp1;
      json.SortedKeywords = temp4;

      /**
       *     Get title and return the clean form
       */
      $('.title_wrapper').filter(function () {
        let data = $(this);
        //  console.log("data" + data);
        title = data.children().first().text().trim();
      });
      //console.log("title tttttttttttttttttttt", title);

      json.Title = title.toString();
      let first_occurrence_index_title_openingTag = json.Title.indexOf('<');
      let first_occurrence_index_title_closingTag = json.Title.indexOf('>');

      let second_occurrence_index_title_openingTag = json.Title.indexOf(
        '<',
        first_occurrence_index_title_closingTag
      );

      json.Title = json.Title.slice(
        first_occurrence_index_title_closingTag + 1,
        second_occurrence_index_title_openingTag
      );

      // console.log(
      //   json.Title.slice(
      //     first_occurrence_index_title_closingTag + 1,
      //     second_occurrence_index_title_openingTag
      //   )
      // );
      // console.log('ttttt', first_occurrence_index_title_openingTag);
      // console.log('ttttt', first_occurrence_index_title_closingTag);

      json.JudgmentLiteratureVector = Judgement;
      json.FakeClaimVector = Fake;
      json.JudgementLiteratureWords = resJ2;
      json.FakeClaimWords = resF2;
      localStorage['Dom-data'] = '';
      Fake = 0;
      Judgement = 0;
      //console.log("localStorage[\"Dom-data\"] after clear buffer", localStorage["Dom-data"]);
      //console.log('\n');
      //console.log("This is our JSON =============>" + '\n', json);
      //console.log("final Json", json);
      res.send(json);
      //window.localStorage.clear();
    }
  });
  //console.log("this is our JSON", json);
  //res.send("hello world");
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;

/**
 * @return {number}
 */

function searchForWord(str1, cleanedKeywordDomTree, flag) {
  let next = 0;
  let finedWord = 0;
  do {
    var n = cleanedKeywordDomTree.indexOf(str1, next);
    finedWord = finedWord + 1;
    next = n + str1.length;
  } while (n >= 0);
  let finalFinedWord = finedWord - 1;
  //console.log("find : ", str1, finalFinedWord);
  if (flag === 'Judgement') {
    Judgement = Judgement + finalFinedWord;
    if (finalFinedWord > 0) {
      let resJ = ` ${str1} : ${finalFinedWord},`;
      resJ2 = resJ2.concat(resJ);
      //console.log("res J : ======================>", '\n', resJ, '\n', resJ2);
    }
  } else if (flag === 'Fake') {
    console.log(finalFinedWord);
    Fake = Fake + finalFinedWord;
    if (finalFinedWord > 0) {
      let resF = ` ${str1} : ${finalFinedWord},`;
      resF2 = resF2.concat(resF);
      //console.log("res F : ======================>", '\n', resF, '\n', resF2);
    }
  }
  return finalFinedWord;
}

/**
 *   Misinformation dictionary
 */
let calculateNLP = (param) => {
  let temp = JSON.stringify(param);
  let cleanedKeywordDomTree = remove_stopwords(temp)
    .replace(/website/g, ' ')
    .replace(/]/g, '')
    .replace('[', '')
    .replace(/no16065310/g, '');
  /**
   *   Fake signal
   */
  for (let fakeWord of FakeWordsDictionary) {
    console.log(fakeWord);
    searchForWord(fakeWord, cleanedKeywordDomTree, 'Fake');
  }
  /**
   *   Credibility Judgment statements dictionary
   */

  for (let JudgeWord of JudgementWordsDictionary) {
    searchForWord(JudgeWord, cleanedKeywordDomTree, 'Judgement');
  }

  let result1 = gramophone.extract(temp);
  //console.log(result1);
  return result1.toString();
};
let concat = (param) => {
  localStorage['Dom-data'] += param;
  //console.log((localStorage['Dom-data']));
  //calculateFake(localStorage['Dom-data']);
  return localStorage['Dom-data'];
};

function remove_stopwords(str) {
  let stopwords2 = [
    'i',
    'me',
    '30copyright',
    'prepared no16065310 30copyright',
    'website',
    'my',
    '0',
    'myself',
    'we',
    '"',
    'our',
    'ours',
    '<p>',
    '</p>',
    '--',
    '<em>',
    'ourselves',
    'you',
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
    'a',
    'about',
    'above',
    'after',
    'again',
    'against',
    'all',
    'am',
    'an',
    'and',
    'any',
    'are',
    "aren't",
    'as',
    'at',
    'be',
    'because',
    'been',
    'before',
    'being',
    'below',
    'between',
    'both',
    'but',
    'by',
    "can't",
    'cannot',
    'could',
    "couldn't",
    'did',
    "didn't",
    'do',
    'does',
    "doesn't",
    'doing',
    "don't",
    'down',
    'during',
    'each',
    'few',
    'for',
    'from',
    'further',
    'had',
    "hadn't",
    'has',
    "hasn't",
    'have',
    "haven't",
    'having',
    'he',
    "he'd",
    "he'll",
    "he's",
    'her',
    'here',
    "here's",
    'hers',
    'herself',
    'him',
    'himself',
    'his',
    'how',
    "how's",
    'i',
    "i'd",
    "i'll",
    "i'm",
    "i've",
    'if',
    'in',
    'into',
    'is',
    "isn't",
    'it',
    "it's",
    'its',
    'itself',
    "let's",
    'me',
    'more',
    'most',
    "mustn't",
    'my',
    'myself',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'on',
    'once',
    'only',
    'or',
    'other',
    'ought',
    'our',
    'ours',
    'ourselves',
    'out',
    'over',
    'own',
    'same',
    "shan't",
    'she',
    "she'd",
    "she'll",
    "she's",
    'should',
    "shouldn't",
    'so',
    'some',
    'such',
    'than',
    'that',
    "that's",
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'there',
    "there's",
    'these',
    'they',
    "they'd",
    "they'll",
    "they're",
    "they've",
    'this',
    'those',
    'through',
    'to',
    'too',
    'under',
    'until',
    'up',
    'very',
    'was',
    "wasn't",
    'we',
    "we'd",
    "we'll",
    "we're",
    "we've",
    'were',
    "weren't",
    'what',
    "what's",
    'when',
    "when's",
    'where',
    "where's",
    'which',
    'while',
    'who',
    "who's",
    'whom',
    'why',
    "why's",
    'with',
    '30copyright',
    "won't",
    'would',
    "wouldn't",
    'you',
    'the',
    "you'd",
    "you'll",
    "you're",
    "you've",
    'your',
    'yours',
    'yourself',
    'yourselves',
    'It',
  ];
  let arr = [];
  let words = (str + +'').split(' ');
  for (let i = 0; i < words.length; i++) {
    let word_clean = words[i].split('.').join('');
    if (!stopwords2.includes(word_clean)) {
      arr.push(word_clean);
      //console.log("cleaned" + res)
    }
  }
  return arr.join(' ');
}

function countUniqueWords(string) {
  try {
    var pattern = /\w+/g,
      matchedWords = string.match(pattern);
    var counts = matchedWords.reduce(function (stats, word) {
      if (stats.hasOwnProperty(word)) {
        stats[word] = stats[word] + 1;
      } else {
        stats[word] = 1;
      }
      return stats;
    }, {});
    /* Now that `counts` has our object, we can log it. */
    //console.log(counts);
    return sortingObjectsAccordingToKeyValue(counts);
  } catch (e) {
    //console.log("countUniqueWords 2 has a problem!!");
  }
}

//
function sortingObjectsAccordingToKeyValue(unsortedCount) {
  try {
    var sortable = [];
    for (let keyword in unsortedCount) {
      sortable.push([keyword, unsortedCount[keyword]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1]; // bubble sort opt quick sort
    });
    return sortable.toString();
  } catch (error) {
    console.log('soriting countUniqueWords 3 has a problem!!');
  }
}

// next step and more NLTK + make them unique
