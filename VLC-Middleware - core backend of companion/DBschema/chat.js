const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companionSchema = new Schema(
  {
    imageUrl: String, //
    companionUserToken: String, // reference
    experience_id: String, // reference
    id: String, //
    chatHistory: [
      {
        id: String,
        message: String,
        value: String,
        trigger: String,
        vlcTime: Date,
      },
    ],
  }
  //{ collection: "CompanionChat" } automatically the collection name
  //will be the plural form of model in this case is CompanionChats
);

module.exports = mongoose.model('CompanionChat', companionSchema);

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
