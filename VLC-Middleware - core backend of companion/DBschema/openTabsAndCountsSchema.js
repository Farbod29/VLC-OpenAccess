const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openTabsAndCountsSchema = new Schema({
  userToken: String,
  experienceId: String,
  uniqueTabCount: Number,
  observedLinkArr: Array,
  currentActiveTab: Array,
  currentActiveTabCount: Number,
  vlcTime: Date,
  image_url: String,
});
module.exports = mongoose.model('Open_Tabs_info', openTabsAndCountsSchema);
