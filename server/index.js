// import RedisClient from "@redis/client/dist/lib/client/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  requestDailyMenuData,
  requestLocationData,
  transformDailyMenuData,
} from "./utils/apiHelper.js";
import { estimateSugars } from "./utils/sugarcalc.js";

const app = express();
const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV || "dev";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Finish implementing redis
/*
const get = (req, res, next) => {
  let key = req.route.path;

  RedisClient.get(key, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
};
const set = (key, value) => {
  RedisClient.set(key, JSON.stringify(value));
};
*/

app.use(express.static(path.resolve(__dirname, "../client/build")));
if (env === "dev") {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Method", "POST, GET");
    next();
  });
}

/**
 * Expected query parameters
 * school - school name
 * startDate - beginning of range for which to retrieve menu data (MM/DD/YY)
 * endDate - end of range for which to retrieve menu data (MM/DD/YY)
 */

app.get("/school", (req, res) => {
  requestDailyMenuData(req.query)
    .then((json) => {
      // res.status(200).send(transformDailyMenuData(json));
      res.status(200).send(estimateSugars(transformDailyMenuData(json)));
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(400).send(err);
    });
});

app.get("/location/search", (req, res) => {
  requestLocationData(req.query)
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
