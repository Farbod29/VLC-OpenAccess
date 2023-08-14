import React from 'react';

const FetchTheCount = () => {
  // console.log("serverSideAddresses");
  // console.log(serverSideAddresses);
  fetch(`${serverSideAddresses}/experiencecounter/getcount`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userToken: 'usrT5SD5FG33@5OCT2021HRW22.eu',
      experienceID: '5OCT2021HRW',
    }),
  })
    .then((res) => res.json())
    .then((res2) => {
      // console.log('counter data =================');
      // console.log(res2);
    });
  return <div></div>;
};

export default FetchTheCount;

// let data = await response.json();
// console.log("counter data =================");
// console.log(data);
