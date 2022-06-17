const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Error al conectar base de datos"));
