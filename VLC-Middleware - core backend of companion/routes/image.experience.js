module.exports = (app) => {
  const image = require("../controller/imageReactionController.js");

  //create new experience
  app.post("/image/reaction", image.createImageExperience);

  //get experience with experienceId and imageUrl
  app.get("/image/reaction-analysis", image.getImageExperience);

  //get experience count
  app.get("/image/reaction", image.getExperienceCount);
};
