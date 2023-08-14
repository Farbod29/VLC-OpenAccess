const mongoose = require('mongoose');
/**
 * Mongo DB connection
 * mongodb+srv://Farbod:<password>@cluster0.ir9e6.mongodb.net/test compas app !
 */

const dbRoute =
  'mongodb+srv://Farbod:9PXXXXXXXXXREMOVEDInPublicMode@cluster0.ir9e6.mongodb.net/COMPANION?retryWrites=true&w=majority';
//connect with compass mongodb+srv://Farbod:9PXXXXXXXXXREMOVEDInPublicMode@cluster0.ir9e6.mongodb.net/test
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('in node');
// var metadataTable = require("../DBschema/imageMetadata");
// metadataTable.find({}, (error, res) => {
//     if (!error)
//         console.log(res)
// });
