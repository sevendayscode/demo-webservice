require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
var compression = require('compression');
const port = process.env.PORT || 3000;
const cors = require('cors');

const whitelist = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cors(corsOptions));

const userRoute = require('./src/routes/user.routes')
const empRoute = require('./src/routes/emp.routes')
const authRoute = require('./src/routes/auth.routes')

app.use('/v1/api/user', userRoute);
app.use('/v1/api/emp', empRoute);
app.use('/v1/api/auth', authRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});