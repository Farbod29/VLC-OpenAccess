const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: String,
    school: String,
    class: String,
    // available_album_name: [],
    // score: Number,
    // seen_post_name: [],
    // seen_post_info: [],
    // loginTimestamps: [Date],
    // logoutTimestamps: [Date],
    created_at: Date,
    //updated_at: Date,
  },
  { collection: "UserTokens" }
);

module.exports = mongoose.model("user", userSchema);

//add preset_album in the future(to show users particular albums)
