var TinCan = require("tincanjs"); //Xapi

class ActionController {
  constructor() {
    try {
      this.lrs = new TinCan.LRS({
        // endpoint:
        //   "https://learninglocker.rias-institute.eu:9443/data/xAPI/statements",
        // username: "685dd04178ce81eee2f44992f90fe9d69bd7f537",
        // password: "fa60a15b2d60b556b1089660d43f14ad0b8b3d51",
        // allowFail: false,
          // endpoint:
          "https:https://analytics.pa.itd.cnr.it/data/xAPI'",
         username: "46b8dc6f4c0e80d87bdda336ea050866f20960f1",
         password: "099ef6015912c3f1428392e98faa4c861dcce3a4",
        allowFail: false,
      });
    } catch (e) {
      console.log("Failed to setup LRS object: ", e);
    }
  }
  createChatAnsweredStatements() {
    let statement = new TinCan.statement({
      actor: {
        mbox: "mailto:usr838fh3@COURAGE.eu",
        name: "usr838fh3",
      },
      verb: {
        id: "http://CourageCompanion.eu/expapi/verbs/experienced/answered",
        display: {
          "en-US": "answered",
        },
      },
      object: {
        definition: {
          name: {
            "en-US": "FakeOrNotQuestion",
            id: "http://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
            value: "Yes",
          },
        },
        id: "http://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
      },
      context: {
        extensions: {
          "http://nextsoftwaresolutions.com/xapi/extensions/user-info": {
            "image-id": "http://curagepixelfed.com/activities/2334",
            "chat-Id": "FakeOrNotQuestion",
            id: "http://curagepixelfed.com/artifact/chat/FakeOrNotQuestion",
            environment: "VLC",
            "vlc-time": "162312432545",
          },
        },
      },
    });
  }
}
