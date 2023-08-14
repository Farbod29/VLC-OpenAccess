const { imageHash } = require("image-hash");

imageHash(
  "/Users/farbodaprin/Desktop/EXTENTION/COMPANION/VLC-NLP-processing-Microservice/targetimg.png",
  16,
  true,
  (error, data) => {
    if (error) throw error;
    console.log(data);
    // 0773063f063f36070e070a070f378e7f1f000fff0fff020103f00ffb0f810ff0
  }
);
