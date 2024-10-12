// const path = require("path");

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require("csurf");
// const flash = require("connect-flash");

// const errorController = require("./controllers/error");
// const User = require("./models/user");

// const MONGODB_URI =
//   "mongodb+srv://shux01:shammika28134@cluster0.el8biun.mongodb.net/grocery";

// const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: "sessions",
// });
// const csrfProtection = csrf({});

// // app.set("view engine", "ejs");
// // app.set("views", "views");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
// const authRoutes = require("./routes/auth");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
// app.use(csrfProtection);
// app.use(flash());

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);

// app.use(errorController.get404);

// mongoose
//   .connect(MONGODB_URI)
//   .then((result) => {
//     app.listen(8080);
//     console.log("server is running at port : " + PORT);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require("stripe");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 7070;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://shux01:shammika28134@cluster0.el8biun.mongodb.net/grocery"
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(user);
app.use(product);
app.use(payment);
app.use(helmet());
app.use(compression());
app.use(morgan("common", { stream: accessLogStream }));

//api
app.get("/", (req, res, next) => {
  res.send("Server is running");
});

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
