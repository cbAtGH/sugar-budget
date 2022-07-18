"use strict";

import RedisClient from "@redis/client/dist/lib/client/index.js";
import express from "express";

import {
  requestDailyMenuData,
  requestLocationData,
  transformDailyMenuData,
} from "./utils/apiHelper.js";

const app = express();
const PORT = process.env.PORT || 4000;

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

app.get("/school/:school/:startDate/:endDate", (req, res) => {
  requestDailyMenuData(req.params)
    .then((json) => {
      res.status(200).send(transformDailyMenuData(json));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.get("/physicalLocation/:location", (req, res) => {
  requestLocationData(req.params)
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
