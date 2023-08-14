const express = require("express");
const fetch = require("node-fetch");
const logger = require("./middleware/logger.js");
//const cors = require("cors");

const app = express();
app.use(logger);
//app.use(cors)
var sendToWitAI = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  console.log(req.params.userChat);
  try {
    const fetchedData = await fetch(
      `https://api.wit.ai/message?v=20210314&q=${req.params.userChat}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer XMGET5D4GDO4YTNTXKSZKV2JJW2BHS23",
        },
      }
    );
    const result = await fetchedData.json();
    console.log("result", result);
    return res.json(result);
  } catch (error) {
    return res.send(error);
  }
};

app.get("/api/v1/witApi/:userChat", sendToWitAI); // {} always need return

app.listen(3009, () => console.log(`LISTENING ON PORT ${3009}`));
