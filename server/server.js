const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();
const user = require("./routes/user");
const books = require("./routes/books");


////  user: admin_user0
//// password: KYQwVZrM69ue0a9a
//// mongodb+srv://admin_user0:KYQwVZrM69ue0a9a@cluster0.1vc3t.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", user);
app.use("/api/books", books);

app.use(express.static('client/build'))

if(process.env.NODE_ENV === 'production'){
const path = require("path");
app.get("/*", (req, res) => {
  console.log("Works");
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("SERVER RUNNING");
});
