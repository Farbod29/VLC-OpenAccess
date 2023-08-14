//Agreement class  CL1 REV=0 and 1

//var imgDat = { R: 5, PR: 4, NS: 2, PF: 4, F: 4 }; // FL cl1 REV=0 and 1   => RESULT 0.016
//var imgDat = { R: 1, PR: 5, NS: 1, PF: 4, F: 7 }; // Dali cl1REV=0 and  => RESULT 1 0.1
//console.log('cl1 => Lennon REV=0 and 1:');                              => RESULT 0.21
var imgDat = { R: 1, PR: 9, NS: 1, PF: 1, F: 6 }; // Lennon  cl1 REV=0 and 1
// console.log('cl1 => Mari REV=0 and 1:');=> RESULT
//var imgDat = { R: 1, PR: 1, NS: 2, PF: 4, F: 10 }; // cl1 => Mari REV=0 and 1
//console.log('cl1 => Magazine REV=0 and 1:'); // => RESULT
//var imgDat = { R: 2, PR: 5, NS: 3, PF: 6, F: 3 }; // cl1 => mag REV=0 and 1

//Agreement class  CL1 REV=1
// var imgDat = { R: 0, PR: 2, NS: 2, PF: 3, F: 3 }; // Fly 0.074
// var imgDat = { R: 0, PR: 2, NS: 1, PF: 4, F: 2 }; // Dali 0.13
//var imgDat = { R: 1, PR: 1, NS: 1, PF: 5, F: 0 }; // Mag 0.29
//var imgDat = { R: 1, PR: 1, NS: 0, PF: 3, F: 1 }; // Mari 0.16
//var imgDat = { R: 0, PR: 3, NS: 0, PF: 0, F: 0 }; // Lennon 1

//Agreement class  CL2 REV=1
//var imgDat = { R: 5, PR: 4, NS: 1, PF: 0, F: 0 }; // Fly 0.275
//var imgDat = { R: 7, PR: 1, NS: 0, PF: 0, F: 1 }; // Dali 0.49  ////
//var imgDat = { R: 0, PR: 0, NS: 0, PF: 0, F: 9 }; // Mag 1
//var imgDat = { R: 0, PR: 0, NS: 0, PF: 0, F: 6 }; // Mari 1
//var imgDat = { R: 1, PR: 0, NS: 1, PF: 0, F: 1 }; // Lennon 0.16

//Agreement class  CL1 REV=0 and 1,

// in this example AABBC => [2,2,1,0] // it already did one step that sum up cat A =>2 , B=> 2  c=> 1 , L=> 0
var catNs = [];
for (let name in imgDat) {
  catNs.push(imgDat[name]);
}
//let k = catNs.length; // in swipeit we will consider k is constant (number of toxic categories)
let k = 5; //in SwipeIt we use constant K becuase the input array at the small number of participant may like this [2,1,4] instead of full category[4,2,3,12,4]
catNs.map((a) => a.tag);
function arraysum(array) {
  return array.reduce(function (accu, i) {
    return accu + i;
  }, 0);
}
let n = arraysum(catNs);
let catN2s = catNs.map(function (i) {
  return i * i;
});
console.log('n=', n);
let sumN2 = arraysum(catN2s);
let Divergence = 0;
if (n === 0) {
  console.log('DM :' + Divergence);
} else {
  Divergence = k === 1 ? 1 : (k * (n * n - sumN2)) / ((k - 1) * n * n);
  // println("Normalised Agreement measure:" + (1 - Agreement * Agreement));
  // console.log('DM :' + Divergence);
  console.log('Agreement :' + (1 - Divergence));
}
