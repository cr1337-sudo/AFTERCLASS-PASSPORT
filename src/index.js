const express = require("express");
const engine = require("ejs-mate");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const cors = require("cors");
require("./database/database");
require("./auth/passport/localAuth");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//ESTO VA ANTES DE PASSPORT!!
app.use(
  session({
    secret: "secret",
    //Actualiza(resave) la sesión con cada refresh
    resave: false,
    //Prevee que se creen cookies de sesión sin necesidad, ya que estarían vacios
    //Solo se guarda si la sesión se modifica
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_STORE_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Settings
const port = process.env.PORT || 3001;
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

//Routes
const authRouter = require("./routes/auth.routes");
app.use("/", authRouter);

//Start server;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
