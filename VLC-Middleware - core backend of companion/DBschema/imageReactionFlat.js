/**Image reaction database schema */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let imageReactionFlat = new Schema(
  {
    experience_id: String,
    image_url: String,
    timestamp: Date,
    userId: String,
    stepID: String,
    vote: String,
    demographicsVote: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('image_Reaction_Flat', imageReactionFlat);
