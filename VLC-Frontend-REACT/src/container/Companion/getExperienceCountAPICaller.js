import experienceIdExtractor from './experienceIdExtractor';
import serverSideAddresses from '../../utils/ServerSideAddress.js';

const getExperienceCountAPI = async (userToken, experienceId) => {
  try {
    const res = await fetch(
      // fetch (url,{})
      `${serverSideAddresses}/experienceCounter/getcount`,
      {
        method: 'POST',
        body: JSON.stringify({
          userToken: userToken,
          experienceId: experienceId,
        }),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    // console.log(res);
    let result = await res.json();
    return result;
  } catch (error) {
    console.log('got problem in fetch API ');
  }
};
const getExperienceCountAPICaller = async () => {
  const userToken = localStorage.getItem('companionUserToken');
  const experienceId = experienceIdExtractor(userToken);
  const countObject = await getExperienceCountAPI(userToken, experienceId);
  localStorage.setItem('experienceCount', countObject.count);
  console.log('countObject.count ========');
  console.log('typeof experienceCount');
  console.log(typeof countObject.count);
  console.log(countObject.count);
  // setExperienceCount(countObject.count);
};

export default getExperienceCountAPICaller;
