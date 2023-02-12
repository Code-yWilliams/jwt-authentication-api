import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import publicRoutes from './routes/public.js';
import secureRoutes from './routes/secure.js';
import './middleware/authentication.js';
import config from "./utils/config.js";
import logger from "./utils/logger.js";

mongoose.connect('mongodb://127.0.0.1:27017/ims', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => {
  logger.error(error);
});
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', publicRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = config.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});