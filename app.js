import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";
import publicRoutes from './routes/public';
import secureRoutes from './routes/secure';
import './middleware/authentication';
import config from "./utils/config";
import logger from "./utils/logger";

mongoose.connect('mongodb://127.0.0.1:27017/ims', { useMongoClient: true });
mongoose.connection.on('error', error => console.error(error));
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