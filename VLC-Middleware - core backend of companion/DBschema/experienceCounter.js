const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  experienceId: String, //
  userToken: String, // reference
  count: Number, //
});
module.exports = mongoose.model("ExperienceSchema", experienceSchema);
