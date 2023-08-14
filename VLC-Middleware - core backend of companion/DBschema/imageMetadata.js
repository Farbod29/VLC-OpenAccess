const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let imageMetadataSchema = new Schema(
  {
    id: String,
    date: Date,
    FirstNLPTitle: String,
    imageHash: String,
    image_url: String,
    OCRText: String,
    KeywordsAggregated: String,
    BestGuessedLabel: String,
    student_tags: [
      {
        student_id: String,
        interaction_time: Date,
        tag: String,
        created_at: Date,
        time: String,
        tag_update_time: Date,
      },
    ],
    variance: Number,
    entropy: Number,
    Pi: Number,
    WebEntities: String,
    Flag: String,
    ReverseImagesMetadataNone: String,
    ReverseImagesMetadata: [
      {
        ReverseImageURLFromGoogleRIS: String,
        ReverseImageURLFromSerpwow: String,
        ReverseImagePageURL: String,
        ReverseImageMatchType: String,
        title: String,
        NLPTitle: String,
        Language: String,
        Keywords: String,
        SortedKeywords: String,
        Position: String,
        Flag: String,
        date: Date,
        Timeout: String,
        Domain: String,
        FakeClaimVector: Number,
        JudgmentLiteratureVector: Number,
        ReverseImageAttribute: String,
        ToxicTerms: String,
        FakeSegments: {},
        JudgementSegments: {}
      },
    ],
  },
  { collection: "metadata_image_table" }
);

module.exports = mongoose.model("metadata_image_table", imageMetadataSchema);

// MUST BEEEE DELETE var Metadata = mongoose.model("metadata_image_table", imageMetadataSchema);
