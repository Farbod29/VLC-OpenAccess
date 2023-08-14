const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highlighted = new Schema(
  {
    //
    vlcTime: Date,
    experienceID: String, //
    companionUserToken: String, // reference
    highlightedBoxList: [],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  //{ collection: "CompanionChat" } automatically the collection name
  //will be the plural form of model in this case is CompanionChats
);

module.exports = mongoose.model('highlighted', highlighted);

/**
 *
 *  Models always should be capital as Collections
 *
 *
 * imageUrl: {type:String ,required:true}, //
 */

//add preset_album in the future(to show users particular albums)
//[Fake , 2 ]

// user action object
