import express from "express";
import config from "./config/config";
import { sync } from "glob";
import { connect, connection } from "mongoose";

connect(config.db);
connection.on("error", () => {
  throw new Error("unable to connect to database at " + config.db);
});

const models = sync(config.root + "/app/models/*.js");
models.forEach(function(model) {
  require(model);
});
const app = express();

export default require("./config/express").default(app, config);

app.listen(config.port, () => {
  console.log("Express server listening on port " + config.port);
});
