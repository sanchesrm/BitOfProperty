import { model } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../../config/secret";

const User = model("Users");

const findLogin = (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .exec()
    .then(user => {
      if (user) {
        var token = jwt.sign({}, secret, {
          subject: user.username,
          expiresIn: "10m"
        });

        return res.status(200).json({
          success: true,
          token: token,
          _id: user._id,
          username: user.username
        });
      } else {
        return res.status(404).json({ error: "Couldn't find user" });
      }
    })
    .catch(e => next(e));
};

const checkToken = (req, res, next) => {
  var token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Failed to authenticate token." });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "No token provided."
    });
  }
};

export { findLogin, checkToken };
