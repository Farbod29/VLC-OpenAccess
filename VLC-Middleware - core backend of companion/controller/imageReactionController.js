const imageReactionSchema = require('../DBschema/imageReaction');
const imageReactionFlat = require('../DBschema/imageReactionFlat');

function getInfoByUrlAndExperienceId(imageUrl, experienceId) {
  return new Promise(function (resolve, reject) {
    imageReactionSchema
      .find({
        $and: [{ image_url: imageUrl }, { experience_id: experienceId }],
      })
      .then((images) => {
        resolve(images);
      })
      .catch((err) => {
        reject('no images found', err);
      });
  });
}

function saveImageExperience(
  imageInfo,
  imageUrl,
  experienceId,
  userId,
  stepID,
  vote,
  demographicsVote
) {
  return new Promise((resolve, reject) => {
    try {
      imageReactionFlat
        .findOneAndUpdate(
          {
            image_url: imageUrl,
            experience_id: experienceId,
            timestamp: Date.now(),
            userId: userId,
            stepID: stepID,
            vote: vote,
            demographicsVote: demographicsVote,
          },
          { new: true },
          { upsert: true }
        )
        .then(() => {
          resolve({ message: 'Success', success: true });
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      console.log('post for the image reaction flat got ERR!!', error);
    }
    try {
      if (imageInfo.length === 0) {
        const image = new imageReactionSchema({
          image_url: imageUrl,
          experience_id: experienceId,
          votes: [
            {
              timestamp: Date.now(),
              userId: userId,
              stepID: stepID,
              vote: vote,
              demographicsVote: demographicsVote,
            },
          ],
        });
        image
          .save()
          .then(() => {
            resolve({ message: 'Success', success: true });
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        var objVotes = {
          timestamp: Date.now(),
          userId: userId,
          stepID: stepID,
          vote: vote,
          demographicsVote: demographicsVote,
        };
        imageReactionSchema
          .findOneAndUpdate(
            {
              $and: [{ image_url: imageUrl }, { experience_id: experienceId }],
            },
            { $push: { votes: objVotes } }
          )
          .then(() => {
            resolve({ message: 'Success', success: true });
          })
          .catch((err) => {
            reject(err);
          });
      }
    } catch (err) {
      reject(err);
    }
  });
}

function findImageByImageUrlAndExperienceId(imageUrl, experienceId) {
  return new Promise((resolve, reject) => {
    try {
      imageReactionSchema
        .find({
          $and: [{ image_url: imageUrl }, { experience_id: experienceId }],
        })
        .then((images) => {
          resolve({ success: true, images });
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
}
function findImages() {
  return new Promise((resolve, reject) => {
    try {
      imageReactionSchema
        .find()
        .then((images) => {
          resolve({ success: true, images });
        })
        .catch((err) => {
          reject('no images found', err);
        });
    } catch (err) {
      reject(err);
    }
  });
}
exports.createImageExperience = async (req, res) => {
  try {
    console.log('createImageExperience req.body');
    //console.log(req.body);
    if (
      !req.body ||
      !req.headers.user_id ||
      !req.body.image_url ||
      !req.body.experience_id ||
      !(req.body.vote || req.body.demographicsVote) ||
      !req.body.stepID
    ) {
      console.log(
        'here is the problem! the data has not enough parameter ====='
      );
      return res.status(400).send({
        success: false,
        message: 'Bad Request',
      });
    } else {
      const userId = req.headers.user_id;
      const imageUrl = req.body.image_url;
      const experienceId = req.body.experience_id;
      const vote = req.body.vote;
      const stepID = req.body.stepID;
      const demographicsVote = req.body.demographicsVote;

      const imageInfo = await getInfoByUrlAndExperienceId(
        imageUrl,
        experienceId
      );

      const imageExperienceSaveFun = await saveImageExperience(
        imageInfo,
        imageUrl,
        experienceId,
        userId,
        stepID,
        vote,
        demographicsVote
      );

      res.send(imageExperienceSaveFun);
    }
  } catch (err) {
    res.status(500).send({ message: 'internal server error', success: false });
  }
};

exports.getImageExperience = async (req, res) => {
  try {
    const imageUrl = req.query.image_url;
    const experienceId = req.query.experience_id;

    if (imageUrl && experienceId) {
      const imageExperienceResult = await findImageByImageUrlAndExperienceId(
        imageUrl,
        experienceId
      );
      res.send(imageExperienceResult);
    } else {
      res.status(400).send({ message: 'Bad Request', success: false });
    }
  } catch {
    res.status(500).send({ message: 'internal server error', success: false });
  }
};

exports.getExperienceCount = async (req, res) => {
  try {
    const images = await findImages();
    res.send(images);
  } catch (err) {
    res.status(500).send({ message: 'internal server error', success: false });
  }
};
