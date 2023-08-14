/** @format */
import serverSideAddresses from "./ServerSideAddress.js";
export default async (userToken, setIsUserExist) => {
  fetch(`${serverSideAddresses}/checkuser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companionUserToken: userToken,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      //localStorage.setItem("isExist", result);
      setIsUserExist(Boolean(result));
      return result;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
