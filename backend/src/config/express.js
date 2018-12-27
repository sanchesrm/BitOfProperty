import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";
import compress from "compression";
import methodOverride from "method-override";
import router from "../app/routes/index.route";

export default (app, config) => {
  const env = process.env.NODE_ENV || "development";
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == "development";

  app.set("view engine", "jade");

  app.use(logger("dev"));
  app.use(json());
  app.use(
    urlencoded({
      extended: true
    })
  );
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + "/public"));
  app.use(methodOverride());
  app.use(cors());

  app.use("/api", router);

  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message
    });
  });

  return app;
};
