const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer();
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 3001;
const app = express();
var userTable = require("./schema/users");
var metadataTable = require("./schema/image");
var userTokenTable = require("./schema/userToken");
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://Farbod:9PUiU6pcSETb@cluster0-rcapo.mongodb.net/test?retryWrites=true&w=majority";
//'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';
// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// metadataTable.deleteMany({ album_name: "Dummy_A1" }, function(err, res) {
//   console.log("res is", res);
// });

// metadataTable.find({album_name:"Dummy_A1"},function(err,res){
//   console.log("res is",res)
// })

userTokenTable.find({}, function(err, res) {
  console.log("res is", res);
});

/**
 *query to count number of tagged to image
 *db.image_table.aggregate([ { $match:{_id:"5e50e7872414d9565caf1af8"}},{$unwind : "$student_tags"},{$group : { _id:"$student_tags.tag" , count : {$sum:1}} }  ])
 */
