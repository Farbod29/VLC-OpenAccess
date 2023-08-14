class CalculateAggregationAndSortingClass {
  async calculateAggregationMethod(nlpOutput) {
    try {
      let self = this;
      var aggregate = ' ';
      nlpOutput.map((nlpObj) => {
        aggregate += nlpObj.Keywords;
        // console.log("Aggregate :", aggregate);
      });
      // resolve(sortingObjectsAccordingToKeyValue(termfrequency(aggregate))
      const output = await self.countUniqueWords(aggregate);
      return await self.filterAgrregatedArray(output);
    } catch (error) {
      console.log('aggregation 1 has a problem!!');
      let foo = '';
      return foo;
    }
  }

  async countUniqueWords(string) {
    try {
      let self = this;
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
      return await self.sortingObjectsAccordingToKeyValue(counts);
    } catch (e) {
      console.log('countUniqueWords 2 has a problem!!');
    }
  }

  async sortingObjectsAccordingToKeyValue(unsortedCount) {
    try {
      var sortable = [];
      for (let keyword in unsortedCount) {
        sortable.push([keyword, unsortedCount[keyword]]);
      }
      sortable.sort(function (a, b) {
        return b[1] - a[1]; // bubble sort opt quick sort
      });
      return sortable;
    } catch (error) {
      console.log('soriting countUniqueWords 3 has a problem!!');
    }
  }

  async filterAgrregatedArray(sortable) {
    try {
      let i;
      let bango = [];
      for (i = 0; i < 12; i++) {
        bango.push(sortable[i]);
      }
      //console.log(bango);
      return bango;
    } catch (error) {
      console.log('filterAgrregatedArray has problem 4');
    }
  }
}

module.exports = new CalculateAggregationAndSortingClass();
