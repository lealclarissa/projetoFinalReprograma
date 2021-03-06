const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require('dotenv-safe').config();
const urls = require("./route/urlsRoute")
const index = require("./route/index")
const users = require("./route/userRoute");

const app = express()

mongoose.connect(process.env.DATABASE_URL, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let db = mongoose.connection;

db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso!")
})

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
      )
      next()
})

app.use("/", index)
app.use("/urls", urls);
app.use("/users", users);
  
module.exports = app
