const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = [process.env.DOMAIN_WHITELIST];
const corsOptions = {
  origin: (origin, callback) => {
    const existe = whitelist.some((dominio) => dominio === origin);

    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors());

app.use("/", routes());

app.use(express.static("uploads"));

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`El servidor esta funcionando en el puerto ${process.env.PORT}`);
});
