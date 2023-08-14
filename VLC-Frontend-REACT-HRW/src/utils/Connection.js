import axios from 'axios';
import StorageKeys from './StorageKeys';
const IP_ADDR = StorageKeys.BASE_API_URL;
const BASE_API_URL = StorageKeys.BASE_API_URL;
const LINK_PREVIEW =
  'http://api.linkpreview.net/?key=5b34416685a7ce81e7408aa64be981a91c4c742b33c57&q=';
const ADD_STUDENT_SUGGESTION_FOR_IMAGE = '/users/addStudentResponse';
const UPDATE_USER_SCORE = '/users/updateUserScore';

/*
const CREATE_BOARD = BASE_API_URL + "boards/create";
const BOARD = BASE_API_URL + "boards/";
const CREATE_REFERENCE = BASE_API_URL + "references/create/";
const LOGIN = IP_ADDR + "/users/login";
const REGISTER = BASE_API_URL + "users/register";
const CHANGE_UserPass = BASE_API_URL + "users/changeUserPass";
const VOTE = BASE_API_URL + "votes/create";
const UPLOAD_PHOTO = BASE_API_URL + "users/uploadPhoto";
const GET_IMAGE = "/users/getImage";
const GET_USER_PROFILE = "/users/getUserProfile";
const ADD_COMPLETED_ALBUM = "/users/addUserAlbum";
const GET_SORTED_VARIANCE = "/users/getSortedVariance";
*/

export {
  getLinkPreviewData,
  parseUrlData,
  /*  createNewBoardData,
  getBoardsData,
  getBoardResourcesData,
  addNewReferenceData,
  loginData,
  registerData,
  changeUserPassData,
  voteData,
  uploadPhotoData,*/
  addStudentResponseForImage,
  updateUserScore,
};

function getLinkPreviewData(url) {
  return axios
    .get(LINK_PREVIEW + url)
    .then((response) => response.data)
    .catch((error) => {
      console.log('error: ' + error);
      console.log('error.data' + error.data);
      console.log('error.status' + error.status);
      console.log('error.statusText' + error.statusText);
      console.log('error.headers' + error.headers);
      console.log('error.config' + error.config);
    });
}

function parseUrlData(url) {
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'JgHJdlmSTEedg5wt6JYnGNAn64zUmfAte8FgtFHV',
    },
  };
  return axios
    .get('https://mercury.postlight.com/parser?url=' + url, axiosConfig)
    .then((response) => {
      console.log('response: ' + JSON.stringify(response));
      return response;
    })
    .catch((error) => {
      console.log('error: ' + error);
      console.log('error.data: ' + error.data);
      console.log('error.status: ' + error.status);
      console.log('error.statusText: ' + error.statusText);
      console.log('error.headers: ' + error.headers);
      console.log('error.config: ' + error.config);
      return error;
    });
}

/*function loginData(username) {
  const headers = {
    "Content-Type": "application/json"
  };
  let data = {
    username: username
  };
  //{window.location.hostname}
  return new Promise(function(resolve, reject) {
    fetch(LOGIN, {
      headers,
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res =>
        res
          .json()
          .then(response => resolve(response))
          .catch(error => reject(error))
      )
      .catch(error => reject(error));
  });
}*/

/*function registerData(email, UserPass) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let data = {
    email: email,
    UserPass: UserPass
  };
  return axios
    .post(REGISTER, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}*/

/*function changeUserPassData(userId, oldUserPass, newUserPass) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let data = {
    userId: userId,
    oldUserPass: oldUserPass,
    newUserPass: newUserPass
  };
  return axios
    .post(CHANGE_UserPass, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}*/

/*function voteData(referenceId, userId, value) {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let data = {
    referenceId: referenceId,
    userId: userId,
    value: value
  };
  return axios
    .post(VOTE, data, axiosConfig)
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("error: " + JSON.stringify(error));
      return error;
    });
}*/

//function to get all the images

function addStudentResponseForImage(params) {
  console.log('params in ui', params);
  return new Promise(function (resolve, reject) {
    fetch(IP_ADDR + ADD_STUDENT_SUGGESTION_FOR_IMAGE, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((result) => result.json().then((res) => resolve(res)))
      .catch((error) => reject(error))
      .catch((error) => reject(error));
  });
}

function updateUserScore(params) {
  console.log('params in ui', params);
  return new Promise(function (resolve, reject) {
    fetch(IP_ADDR + UPDATE_USER_SCORE, {
      method: 'PUT',
      body: JSON.stringify(params),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((result) => result.json().then((res) => resolve(res)))
      .catch((error) => reject(error))
      .catch((error) => reject(error));
  });
}
