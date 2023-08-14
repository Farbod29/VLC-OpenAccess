/**Image reaction database schema */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let imageReactionSchema = new Schema(
  {
    experience_id: String,
    image_url: String,
    votes: [
      {
        timestamp: Date,
        userId: String,
        stepID: String,
        vote: String,
        demographicsVote: String,
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("image_reaction_info", imageReactionSchema);
