const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      experience_id: 'RIAS14Jan2022',
    },
  },
  {
    $match: {
      'votes.vote': 'Fake',
    },
  },
  {
    $unwind: {
      path: '$votes',
    },
  },
  {
    $match: {
      'votes.vote': 'Fake',
    },
  },
  {
    $group: {
      _id: '$_id',
      votes: {
        $push: '$votes',
      },
    },
  },
];

MongoClient.connect(
  'mongodb+srv://Farbod:XXXXXremoveInPublicmode@cluster0.ir9e6.mongodb.net/test?authSource=admin&replicaSet=atlas-v9ylgs-shard-0&readPreference=primary&ssl=true',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('COMPANION').collection('image_reaction_infos');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
      //   console.log(result);
    });
    client.close();
    console.log(coll);
  }
);
