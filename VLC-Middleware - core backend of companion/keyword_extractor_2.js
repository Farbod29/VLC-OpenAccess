//var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var gramophone = require('gramophone');
var localStorage = require('node-localstorage');
var keyword_extractor = require('keyword-extractor');
// cheerio documentation http://zetcode.com/javascript/cheerio/
var Tesseract = require('tesseract.js');

async function keyword_extractor_29(imageUrl, callBack) {
  // Let's scrape Anchorman 2
  var url = imageUrl;
  //console.log("imageUrl inside keyword extractor", imageUrl);
  //https://news.cgtn.com/news/2020-04-29/Japanese-Nobel-laureate-refutes-link-to-China-made-coronavirus-claim-Q5FbPOxjRC/index.html
  //https://www.bbc.com/future/article/20200403-coronavirus-will-hot-drinks-protect-you-from-covid-19
  await new Promise(async function (resolve, reject) {
    try {
      try {
        await request(url, async function (error, response, html) {
          /// will jump
          //var $ = cheerio.load(html);
          var $ = await cheerio.load(html);
          //var title, release, rating;ty56
          let title = $('title');
          // console.log(
          //   "title from cherio",
          //   title.toString().replace("<title>", "")
          // );
          //console.log("Title :");
          //console.log(title.text());
          var json = { RIVurl: '', title: '', Keywords: '' };
          json.RIVurl = url;
          $('h2, h1, p').filter(function () {
            var data2 = $(this);
            let CleanDomBody = remove_stopwords(data2.text()).replace(
              /<a\b[^>]*>(.*?)<\/a>/i,
              ''
            );
            //console.log(remove_stopwords(data2.text()).replace(/<a\b[^>]*>(.*?)<\/a>/i,""));
            let extraction_result = keyword_extractor.extract(CleanDomBody, {
              language: 'english',
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: true,
            });
            //console.log("Keyword_extraction_result: ");
            let temp = concat(extraction_result);
            response = calculateNLP(temp);
            json.Keywords = response;
            json.title = title.toString().replace('<title>', '');
            //.log("response =====", response);
            resolve(response);
            // console.log('localStorage["Dom-data"]', localStorage["Dom-data"]);
            $('.title_wrapper').filter(function () {
              var data = $(this);
              //  console.log("data" + data);
              title = data.children().first().text().trim();
              //release = data.children().last().children().last().text().trim();
              //  console.log( "title " +title);
              json.title = title;
              // console.log("json.title", json.title);
            });
          });
          localStorage['Dom-data'] = ' ';
          // console.log(
          //   'localStorage["Dom-data"] after clear buffer',
          //   localStorage["Dom-data"]
          // );
          // console.log("JSON URL", json.RIVurl);
          callBack(json);
        });
      } catch (error) {
        console.log('Chero didnt respond ');
      }

      /**
       * @return {number}
       */
      function searchForWord(str1, str2) {
        let next = 0;
        let findedword = 0;
        do {
          var n = str2.indexOf(str1, next);
          findedword = findedword + 1;
          next = n + str1.length;
        } while (n >= 0);
        console.log('fined : ', str1, findedword - 1);
        return findedword;
      }

      /**
       *   Misinformation dictionary
       */
      let calculateNLP = (param) => {
        let temp = JSON.stringify(param);
        var cleanedKeywordDomTree = remove_stopwords(temp)
          .replace('website', ' ')
          .replace(']', '')
          .replace('[', '')
          .replace('prepared no16065310 30copyright', '');
        //console.log(temp);
        console.log(
          ' =========== claim about Misinformation keywords ==========='
        );
        localStorage['fake reputation'] = searchForWord(
          'fake',
          cleanedKeywordDomTree
        );
        localStorage['misinformation'] = searchForWord(
          'misinformation',
          cleanedKeywordDomTree
        );
        localStorage['false'] = searchForWord('false', cleanedKeywordDomTree);
        localStorage['unsubstantiated,claim'] = searchForWord(
          'unsubstantiated,claim',
          cleanedKeywordDomTree
        );
        /**
         *   Credibility Judgment statements dictionary
         */
        console.log('=========== Judgment view keywords ===========');
        localStorage['statement'] = searchForWord(
          'statement',
          cleanedKeywordDomTree
        );
        localStorage['claiming'] = searchForWord(
          'claiming',
          cleanedKeywordDomTree
        );
        localStorage['proved'] = searchForWord('proved', cleanedKeywordDomTree);
        localStorage['allegation'] = searchForWord(
          'allegation',
          cleanedKeywordDomTree
        );
        localStorage['legitimation'] = searchForWord(
          'legitimation',
          cleanedKeywordDomTree
        );
        localStorage['reference'] = searchForWord(
          'reference',
          cleanedKeywordDomTree
        );
        localStorage['review'] = searchForWord('review', cleanedKeywordDomTree);
        localStorage['official'] = searchForWord(
          'official',
          cleanedKeywordDomTree
        );
        localStorage['In fact'] = searchForWord(
          'In fact',
          cleanedKeywordDomTree
        );
        localStorage['conspiracy'] = searchForWord(
          'conspiracy',
          cleanedKeywordDomTree
        );
        localStorage['denied'] = searchForWord('denied', cleanedKeywordDomTree);
        let res2 = gramophone.extract(temp);
        // console.log(res2);
        return res2.toString();
      };
      var concat = (param) => {
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
          "won't",
          'would',
          "wouldn't",
          'you',
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
        let res = [];
        let words = (str + +'').split(' ');
        for (let i = 0; i < words.length; i++) {
          let word_clean = words[i].split('.').join('');
          if (!stopwords2.includes(word_clean)) {
            res.push(word_clean);

            //console.log("cleaned" + res)
          }
        }
        return res.join(' ');
      }
    } catch (error) {
      reject({
        success: 0,
        message: 'unable to extract keywords',
      });
    }
  });
}

module.exports = keyword_extractor_29;
