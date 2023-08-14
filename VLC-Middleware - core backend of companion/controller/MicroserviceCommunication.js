//const axios = require('axios');

class MicroserviceCommunication {
  // async makeRequest() {
  //
  //     const config = {
  //         method: 'POST',
  //         url: 'http://localhost:8081/scraperAndAnalyser',
  //         data: {
  //             "RIVurl": "https://news.cgtn.com/news/2020-04-29/Japanese-Nobel-laureate-refutes-link-to-China-made-coronavirus-claim-Q5FbPOxjRC/index.html"
  //         }
  //     };
  //     let res = await axios(config);
  //     console.log(res);
  // }
  //console.log("resolve",resolve);
  // async sendRIVGoogleURlsToMicroserviceAPI1(param) {
  //     console.log("sendRIVGoogleURlsToMicroserviceAPI", param);
  //     return new Promise(await function (resolve, reject) {
  //         fetch('http://localhost:8081/scraperAndAnalyser', {
  //             method: "PUT",
  //             body: JSON.stringify(param),
  //             headers: {
  //                 "content-type": "application/json"
  //             }
  //         })
  //             .then(result => result.json().then(
  //                 res => resolve(res)))
  //             .catch(error => reject(error))
  //             .catch(error => reject(error));
  //     });
  // }

  async sendRIVGoogleURlsToMicroserviceAPI(param) {
    try {
      // console.log('sendRIVGoogleURlsToMicroserviceAPI', param);
      const res = await fetch('http://localhost:8081/scraperAndAnalyser', {
        method: 'PUT',
        body: JSON.stringify(param),
        headers: {
          'content-type': 'application/json',
        },
      });
      return res.json();
    } catch (error) {
      console.log('got problem in fetch API for scrapper ');
    }
  }
}

module.exports = new MicroserviceCommunication();
