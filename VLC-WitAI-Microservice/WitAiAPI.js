// sendToWitAI = async (param) => {
//     try {
//       console.log("sendRIVGoogleURlsToMicroserviceAPI", param);
//       const res = await fetch("http://localhost:8081/scraperAndAnalyser", {
//         method: "PUT",
//         body: JSON.stringify(param),
//         headers: {
//           "content-type": "application/json",
//         },
//       });
//       return res.json();
//     } catch (error) {
//       console.log("got problem in fetch API ");
//     }
//   }
// }

module.exports = new sendToWitAI();
