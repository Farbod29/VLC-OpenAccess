const GSR = require('google-search-results-nodejs');
const client = new GSR.GoogleSearchResults("secret_api_key");
//AIzaSyAmWg7BD1HLmQyRJR0tigVEcDHc0vh68j0
const params = {
    engine: "google_reverse_image",
    google_domain: "google.com",
    image_url: "https://i.imgur.com/HBrB8p0.png"
};

const callback = function(data) {
    console.log(data);
};

// Show result as JSON
client.json(params, callback);
