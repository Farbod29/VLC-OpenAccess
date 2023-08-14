var userTable = require('../DBschema/users');
//var metadataTable = require("../DBschema/imageMetadata");
//var userTokenTable = require("../DBschema/userToken");
//const jwt = require("jsonwebtoken");
//var config = require("../config");
/**
 * @typedef UserParams
 * @property {String} username
 * @property {String} student_id
 * @property {String} album_name
 */

class UserController {
  /**
   * get userID of an user by his username
   * @param {String} username
   */
  getUserIdByUsername(username) {
    return new Promise(function (resolve, reject) {
      try {
        userTable.findOne({ username: username }, (error, res) => {
          if (error) {
            resolve(false);
          }
          if (res === null) {
            resolve(false);
          } else {
            resolve(res);
          }
        });
      } catch (error) {
        resolve(false);
      }
    });
  }

  /**
   * add new user into the database(mostly by using a csv file)
   * @param {UserParams} params
   */
  async addNewUser(params) {
    // never called not used can be deleted
    //const isUserAvailable = await this.getSingleUserByUsername(params.username);
    let self = this;
    return new Promise(async function (resolve, reject) {
      try {
        // if (isUserAvailable) {
        //   console.log("GozpichBepich");
        //   const resp = await self.updateExistingUser(params);
        //   resolve(resp);
        // } else {
        console.log('Gozpich');
        var user = new userTable({
          username: params.username,
          school: params.school,
          class: params.class,
          // available_album_name: params.available_album_name,
          created_at: new Date(new Date().toUTCString()),
        });
        user.save(function (err) {
          if (err) {
            resolve({
              success: 0,
              message: 'unable to save user',
            });
          }
          resolve({
            success: 1,
            message: 'user added successfully',
          });
        });
      } catch (error) {
        resolve({
          success: 0,
          message: 'unable to save user',
        });
      }
    });
  }

  async updateExistingUser(params) {
    return new Promise(function (resolve, reject) {
      try {
        userTable.updateOne(
          { username: params.username },
          {
            $set: {
              school: params.school,
              class: params.class,
              available_album_name: params.available_album_name,
              updated_at: new Date(new Date().toUTCString()),
            },
          },
          function (err) {
            if (err) {
              console.log('Err is', err);
              resolve({
                success: 0,
                message: 'unable to save user',
              });
            }
            resolve({
              success: 1,
              message: 'user added successfully',
            });
          }
        );
      } catch (error) {
        resolve({
          success: 0,
          message: 'unable to save user',
        });
      }
    });
  }

  async addAllUsers(allUsers) {
    let self = this;
    // console.log(allUsers);
    return new Promise(function (resolve, reject) {
      try {
        let response = [];
        allUsers.forEach(async function (item, index) {
          if (item.username !== null && item.username !== undefined) {
            let obj = {};
            let values = Object.values(item);
            obj.username = item.username.trim();
            obj.school = item.school;
            obj.class = item.class;
            obj.available_album_name = values.slice(3, values.length);
            //console.log(obj);
            let resp = await self.addNewUser(obj);
            if (resp.success === 1) {
              response.push({ username: item.username, success: 1 });
            } else {
              response.push({ username: item.username, success: 0 });
            }
          }
        });
        //console.log(response);
        resolve({
          success: 1,
          message: 'users added',
        });
      } catch (error) {
        resolve({
          success: 0,
          message: 'unable to save user',
        });
      }
    });
  }

  /**
   * check validity of an user whether he/she is available in database or not
   * @param {UserParams} params
   */
  async login(params) {
    let self = this;
    return new Promise(async function (resolve, reject) {
      try {
        const isUserAvailable = await self.getSingleUserByUsername(
          params.username
        );
        if (isUserAvailable) {
          await self.saveLoginTime(params.username);
          resolve({
            success: true,
            message: 'login success',
          });
        } else {
          resolve({
            success: false,
            message: 'unable to login',
          });
        }
      } catch (error) {
        console.log('db error in login', error);
        resolve({
          success: false,
          message: 'unable to login',
        });
      }
    });
  }

  async logout(params) {
    let self = this;
    return new Promise(async function (resolve, reject) {
      try {
        // const isUserAvailable = await self.getSingleUserByUsername(
        //   params.username
        // );
        if (isUserAvailable) {
          await self.saveLogoutTime(params.username);
          resolve({
            success: true,
            message: 'logout success',
          });
        } else {
          resolve({
            success: false,
            message: 'unable to logout',
          });
        }
      } catch (error) {
        console.log('db error in logout', error);
        resolve({
          success: false,
          message: 'unable to logout',
        });
      }
    });
  }
  async saveLoginTime(userID) {
    //console.log("saveLoginTime has been called");
    let userprofile = await userTable.findOneAndUpdate(
      { username: userID },
      { $push: { loginTimestamps: new Date() } },
      {
        new: true,
      }
    );
    // save the userprofile to external json !!
    //console.log(userprofile.loginTimestamps)
  }
  async saveLogoutTime(userID) {
    //console.log('saveLogoutTime has been called');
    let userprofile = await userTable.findOneAndUpdate(
      { username: userID },
      { $push: { logoutTimestamps: new Date() } },
      {
        new: true,
      }
    );
    // save the userprofile to external json !!
    //console.log(userprofile.logoutTimestamps)
  }

  /**
   * get whether user is available or not by his username
   * @param {String} username
   */
  // getSingleUserByUsername(username) {
  //   return new Promise(function (resolve, reject) {
  //     try {
  //       userTable.findOne({ username: username }, (error, res) => {
  //         if (error) {
  //           resolve(false);
  //         }
  //         if (res === null) {
  //           resolve(false);
  //         } else {
  //           resolve(true);
  //         }
  //       });
  //     } catch (error) {
  //       console.log("error2", error);
  //       resolve(false);
  //     }
  //   });
  // }

  /**
   * update the overall score of an user
   * @param {UserParams} params
   */
  updateUserScore(params) {
    return new Promise(function (resolve, reject) {
      try {
        userTable.findOne({ username: params.student_id }, (error, res) => {
          if (error) {
            resolve({
              success: 0,
              message: 'user not found',
            });
          }
          if (res === null || res === undefined) {
            resolve({
              success: 0,
              message: 'user not found',
            });
          } else {
            let score = 0;
            if (res.score) {
              score = res.score + 100;
            } else {
              score = 100;
            }
            userTable.findByIdAndUpdate(
              res.id,
              {
                $set: {
                  score: score,
                  updated_at: new Date(new Date().toUTCString()),
                },
              },
              (err, res) => {
                if (err) {
                  resolve({
                    success: 0,
                    message: 'unable to update',
                  });
                } else {
                  resolve({
                    success: 1,
                    message: 'score updated successfully',
                  });
                }
              }
            );
          }
        });
      } catch (error) {
        console.log('error2', error);
        resolve({
          success: 0,
          message: 'user not found',
        });
      }
    });
  }

  /**
   * get complete profile of an user(also whatever image he/she has been tagged)
   * @param {UserParams} params
   */
  // async getUserCompleteProfile(params) {
  //   const isUserAvailable = await this.getUserIdByUsername(params.student_id);
  //   return new Promise(function (resolve, reject) {
  //     try {
  //       console.log("is user available is", isUserAvailable, params);
  //       if (isUserAvailable === false) {
  //         throw new Error("User not found");
  //       } else {
  //         metadataTable.find(
  //           { "student_tags.student_id": isUserAvailable.username },
  //           (err, res) => {
  //             if (err) {
  //               throw new Error("user not found");
  //             } else {
  //               let obj = {
  //                 user_info: isUserAvailable,
  //                 tagged_image: res.map((item) => item.image_id),
  //                 created_at: new Date(new Date().toUTCString()), //logdate29
  //               };
  //               resolve({
  //                 success: 1,
  //                 data: obj,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     } catch (error) {
  //       console.log("Error", error);
  //       resolve({
  //         success: 0,
  //         message: "unable to get user profile",
  //       });
  //     }
  //   });
  // }

  /**
   * add completed album record in the user table
   * @param {UserParams} params
   */
  async addCompletedAlbum(params) {
    return new Promise(function (resolve, reject) {
      try {
        userTable.find({ username: params.username }, function (err, res) {
          if (err) {
            resolve({ success: 0, message: 'unable to update album' });
          } else {
            if (
              res.length === 1 &&
              res[0].seen_album_name.findIndex(
                (item) => item === params.album_name
              ) < 0
            ) {
              let seen_album_name = res[0].seen_album_name;
              let seen_album_info = res[0].seen_album_info;
              seen_album_name.push(params.album_name);
              seen_album_info.push({
                name: params.album_name,
                end_time: new Date(new Date().toUTCString()),
              });
              userTable.update(
                { username: params.username },
                {
                  $set: {
                    seen_album_name: seen_album_name,
                    seen_album_info: seen_album_info,
                    updated_at: new Date(new Date().toUTCString()),
                  },
                },
                function (err, res) {
                  if (err) {
                    throw new Error('unable to update');
                  } else {
                    resolve({ success: 1, message: 'album added' });
                  }
                }
              );
            } else {
              resolve({ success: 1, message: 'album already added' });
            }
          }
        });
      } catch (error) {
        resolve({ success: 0, message: 'unable to update album' });
      }
    });
  }

  // generateAuthToken(user) {
  //   return new Promise(function (resolve, reject) {
  //     try {
  //       const token = jwt.sign({ _id: user.username }, config.secret);
  //       var userToken = new userTokenTable({
  //         username: user.username,
  //         token: token,
  //       });
  //       userToken.save(function (err) {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(token);
  //       });
  //     } catch (error) {
  //       console.log("error in generating token", token);
  //       reject(error);
  //     }
  //   });
  // }
}
module.exports = new UserController();
