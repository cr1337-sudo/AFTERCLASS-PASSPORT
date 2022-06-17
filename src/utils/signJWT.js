const jwt = require("jsonwebtoken");

const signJWT = (user) => {
  const { _id } = user;

  const payload = {
    sub: _id,
  };

  const signedToken = jwt.sign(payload, "PRIVATE_KEY", { expiresIn: "1d" });

  return {
    token: `Bearer ${signedToken}`,
    expiresIn: "1d",
  };
};

module.exports = signJWT;
