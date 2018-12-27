import { normalize } from "path";

const rootPath = normalize(__dirname + "/..");
const env = process.env.NODE_ENV || "development";
const jwtSecret = process.env.JWT_SECRET || "1234";

const config = {
  development: {
    root: rootPath,
    app: {
      name: "bitOfProperty-backend"
    },
    port: process.env.PORT || 9000,
    db: "mongodb://localhost:27017/bitOfProperty",
    jwtSecret
  },

  test: {
    root: rootPath,
    app: {
      name: "bitOfProperty-backend"
    },
    port: process.env.PORT || 9000,
    db: "mongodb://localhost:27017/bitOfProperty",
    jwtSecret
  },

  production: {
    root: rootPath,
    app: {
      name: "bitOfProperty-backend"
    },
    port: process.env.PORT || 9000,
    db: "mongodb://localhost:27017/bitOfProperty",
    jwtSecret
  }
};

export default config[env];
