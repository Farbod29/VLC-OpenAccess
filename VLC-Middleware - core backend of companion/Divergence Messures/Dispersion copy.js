//             0        1        2        3         4
console.log('classification 1');

let imgDat = {
  Fake: 6,
  PFake: 1,
  NotSure: 0,
  PFact: 5,
  Real: 9,
}; // in this example AABBC => [2,2,1,0] // it already did one step that sum up cat A =>2 , B=> 2  c=> 1 , L=> 0
let catNs = [];
for (let name in imgDat) {
  catNs.push(imgDat[name]);
}

//================Dispersions Measurement =========================
{
  //let k = catNs.length; // in swipeit we will consider k is constant (number of toxic categories)
  let k = 5; //in SwipeIt we use constant K becuase the input array at the small number of participant may like this [2,1,4] instead of full category[4,2,3,12,4]
  //catNs.map((a) => a.tag);

  function arraysum(array) {
    return array.reduce(function (accu, i) {
      return accu + i;
    }, 0);
  }

  let n = arraysum(catNs);
  console.log('n', n);
  let catN2s = catNs.map(function (i) {
    return i * i;
  });
  let sumN2 = arraysum(catN2s);
  let Divergence = 0;
  if (n === 0) {
    console.log('DM: ' + Divergence);
    console.log('   ');
  } else {
    Divergence = k === 1 ? 1 : (k * (n * n - sumN2)) / ((k - 1) * n * n);
    // console.log(catNs("Normalised Agreement measure:" + (1 - Agreement * Agreement));
    console.log('DM: ' + Divergence);
    console.log('   ');
  }
  //

  // function getBaseLog(x, y) {
  //   return Math.log(y) / Math.log(x);
  //}
}
//     //================Group Disagreement=========================
//     {
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       //  console.log(catNs("number of students:");
//       //  console.log(catNs(n);
//       let disagreement = 0;
//       let allSum = 0; // sum up all individual disagree
//       //let frequency = 0;// number of voters for each category
//       for (const frequency of catNs) {
//         //runs over categories, frequency is the number of voter for each category
//         // console.log(catNs("frequency ===== :");
//         // console.log(catNs(frequency);
//         disagreement = n - frequency; // as mentioned in the paper we want to find the idea of the voter in comparison from rest of the ,
//         // console.log(catNs("disagreement :"); // means if the group is empty then the ==>
//         // console.log(catNs(disagreement);
//         switch (frequency) {
//           case 0:
//             disagreement = 0; // ==> disagreement will be zero (no one participate in X category)
//             break;
//           case 1:
//             allSum += disagreement; //==> means just one person will be in x category and all other voters has different ideas (n-1 voters are disagree)
//             break;
//           default:
//             allSum += disagreement * frequency; // ==> A AAAB in this case frequency is (A.frequency) = 4,
//           // or we can say A happend 4 times, then instead of looping and calculation disagreement for each
//           // A (vote) we consider one dis*frequency(number of voters for each category).
//         }
//       }
//       GroupOfDisagreement = allSum / (n * (n - 1));
//       //GroupOfAgreement = 1 - GroupOfDisagreement;
//       console.log('GD:  ' + GroupOfDisagreement);
//     }
//     console.log('   ');
//     //=================Pi parameter of Fleiss' kappa==========================
//     {
//       let Pi = 0;
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       let n1 = 0;
//       let SumNpow2k = 0;
//       let map1Pow2 = catNs.map((x) => (n1 = x * x));
//       map1Pow2.map((x) => (SumNpow2k = x + SumNpow2k));
//       /***
//              PI =
//              ***/
//       Pi = (1 / (n * (n - 1))) * (SumNpow2k - n);
//       console.log('1-Pi:  ' + (1 - Pi)); // Pi is toggled for dis
//     }
//     console.log('   ');
//     //=================Shanon diversity index ==========================
//     {
//       let k = 4;
//       let fk = 0;
//       let n = 0;
//       let shannon = 0;
//       let e = Math.exp(1);
//       catNs.map((x) => (n = x + n));

//       function CalculateSpi(fk) {
//         return fk / n;
//       }

//       catNs.map(
//         (fk) => (shannon += CalculateSpi(fk) * getBaseLog(e, CalculateSpi(fk)))
//       );
//       console.log('Shanon Diversity:  ' + -1 * shannon);
//       console.log('   ');
//       console.log(
//         'Normalised Shanon Diversity :  ' + (-1 * shannon) / getBaseLog(e, n)
//       ); //Math.E() Euler's number constant = 2.718281828459045
//       console.log('   ');
//       //console.log(getBaseLog(e, n));
//       //console.log("Normalised and round the result of Shanon Diversity :  " +  Math.round(((-1) * shannon) / getBaseLog(e, n)) );//Math.E() Euler's number constant = 2.718281828459045
//       //console.log("Normalised Shanon Diversity :  " + ((-1) * shannon)/1.3862943611199137);
//     }
//     //=================  Simpson's index of diversity ==========================
//     {
//       //console.log(getBaseLog(2.718281828459, 0.05));
//       //let k = 4;
//       let sumFk = 0;
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       catNs.map((fk) => (sumFk += fk * (fk - 1)));
//       let simpson = 1 - sumFk / (n * (n - 1));
//       console.log("Simpson's index :  " + simpson);
//       console.log('   ');
//     }
//     //===========================
//   }
// }
// console.log('classification 2');
// {
//   let imgDat = {
//     Fake: 6,
//     PFake: 1,
//     NotSure: 0.000000000000000001,
//     PReal: 5,
//     Real: 9,
//     // for zero case 0.000000000000000001
//   }; // in this example AABBC => [2,2,1,0] // it already did one step that sum up cat A =>2 , B=> 2  c=> 1 , L=> 0
//   let catNs = [];
//   for (let name in imgDat) {
//     catNs.push(imgDat[name]);
//   }
//   console.log('   ');
//   console.log(catNs);
//   console.log('   ');

//   function getBaseLog(x, y) {
//     return Math.log(y) / Math.log(x);
//   }

//   //================Dispersions Messurment=========================
//   {
//     //let k = catNs.length; // in swipeit we will consider k is constant (number of toxic categories)
//     let k = 4; //in SwipeIt we use constant K becuase the input array at the small number of participant may like this [2,1,4] instead of full category[4,2,3,12,4]
//     catNs.map((a) => a.tag);

//     function arraysum(array) {
//       return array.reduce(function (accu, i) {
//         return accu + i;
//       }, 0);
//     }

//     let n = arraysum(catNs);
//     let catN2s = catNs.map(function (i) {
//       return i * i;
//     });
//     let sumN2 = arraysum(catN2s);
//     let Divergence = 0;
//     if (n === 0) {
//       console.log('DM: ' + Divergence);
//       console.log('   ');
//     } else {
//       Divergence = k === 1 ? 1 : (k * (n * n - sumN2)) / ((k - 1) * n * n);
//       // console.log(catNs("Normalised Agreement measure:" + (1 - Agreement * Agreement));
//       console.log('DM: ' + Divergence);
//       console.log('   ');
//     }
//     //================Group Disagreement=========================
//     {
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       //  console.log(catNs("number of students:");
//       //  console.log(catNs(n);
//       let disagreement = 0;
//       let allSum = 0; // sum up all individual disagree
//       //let frequency = 0;// number of voters for each category
//       for (const frequency of catNs) {
//         //runs over categories, frequency is the number of voter for each category
//         // console.log(catNs("frequency ===== :");
//         // console.log(catNs(frequency);
//         disagreement = n - frequency; // as mentioned in the paper we want to find the idea of the voter in comparison from rest of the ,
//         // console.log(catNs("disagreement :"); // means if the group is empty then the ==>
//         // console.log(catNs(disagreement);
//         switch (frequency) {
//           case 0:
//             disagreement = 0; // ==> disagreement will be zero (no one participate in X category)
//             break;
//           case 1:
//             allSum += disagreement; //==> means just one person will be in x category and all other voters has different ideas (n-1 voters are disagree)
//             break;
//           default:
//             allSum += disagreement * frequency; // ==> A AAAB in this case frequency is (A.frequency) = 4,
//           // or we can say A happend 4 times, then instead of looping and calculation disagreement for each
//           // A (vote) we consider one dis*frequency(number of voters for each category).
//         }
//       }
//       GroupOfDisagreement = allSum / (n * (n - 1));
//       //GroupOfAgreement = 1 - GroupOfDisagreement;
//       console.log('GD:  ' + GroupOfDisagreement);
//     }
//     console.log('   ');
//     //=================Pi parameter of Fleiss' kappa==========================
//     {
//       let Pi = 0;
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       let n1 = 0;
//       let SumNpow2k = 0;
//       let map1Pow2 = catNs.map((x) => (n1 = x * x));
//       map1Pow2.map((x) => (SumNpow2k = x + SumNpow2k));
//       /***
//                PI =
//                ***/
//       Pi = (1 / (n * (n - 1))) * (SumNpow2k - n);
//       console.log('1-Pi:  ' + (1 - Pi)); // Pi is toggled for dis
//     }
//     console.log('   ');
//     //=================Shanon diversity index ==========================
//     {
//       let k = 5;
//       let fk = 0;
//       let n = 0;
//       let shannon = 0;
//       let e = Math.exp(1);
//       catNs.map((x) => (n = x + n));

//       function CalculateSpi(fk) {
//         return fk / n;
//       }

//       catNs.map(
//         (fk) => (shannon += CalculateSpi(fk) * getBaseLog(e, CalculateSpi(fk)))
//       );
//       console.log('Shanon Diversity:  ' + -1 * shannon);
//       console.log('   ');
//       console.log(
//         'Normalised Shanon Diversity :  ' + (-1 * shannon) / getBaseLog(e, n)
//       ); //Math.E() Euler's number constant = 2.718281828459045
//       console.log('   ');
//       //console.log(getBaseLog(e, n));
//       //console.log("Normalised and round the result of Shanon Diversity :  " +  Math.round(((-1) * shannon) / getBaseLog(e, n)) );//Math.E() Euler's number constant = 2.718281828459045
//       //console.log("Normalised Shanon Diversity :  " + ((-1) * shannon)/1.3862943611199137);
//     }
//     //=================  Simpson's index of diversity ==========================
//     {
//       //console.log(getBaseLog(2.718281828459, 0.05));
//       //let k = 4;
//       let sumFk = 0;
//       let n = 0;
//       catNs.map((x) => (n = x + n));
//       catNs.map((fk) => (sumFk += fk * (fk - 1)));
//       let simpson = 1 - sumFk / (n * (n - 1));
//       console.log("Simpson's index :  " + simpson);
//       console.log('   ');
//     }
//     //===========================
//   }
// }
