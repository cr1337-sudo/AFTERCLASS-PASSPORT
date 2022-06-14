const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../models/user.model");
//Metodo de autenticación, es llamado por la ruta
//Recibe 2 parametros:
//Un objeto con options y los datos recibidos del cliente
//Un callback con la lógica
passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, //Para decir que también se reciban los datos request
      //Done es otro callback
    },
    async (req, email, password, done) => {
      const checkUserExists = await User.findOne({ email });
      if (checkUserExists) {
        //Como primer parametro se pasa un ERROR o null, en este caso null
        //Como segundo parametro se pasa el user o un false, si es false va a la url de fallo
        done(null, false);
      } else {
        const newUser = new User({ email });
        //Es un método de la instancia!
        newUser.password = newUser.encryptPass(password);
        const savedUser = await newUser.save();
        done(null, savedUser._id);
      }
    }
  )
);

//Almacenar los datos en el navegador (en este caso solo el id), de acá se obtienen los datos de deserialize
passport.serializeUser((userId, done) => {
  done(null, userId);
});

//Obtener los datos almacenados en el navegador y los envío nuevamente
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, //Para decir que también se reciban los datos request
      //Done es otro callback
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        //Como primer parametro se pasa un ERROR o null, en este caso null
        //Como segundo parametro se pasa el user o un false, si es false va a la url de fallo
        return done(null, false, "El usuario no existe!");
      }

      if (!user.comparePass(password, user.password)) {
        return done(null, false, "Las contraseñas no coinciden");
      }

      return done(null, user, "aah perro");
    }
  )
);
