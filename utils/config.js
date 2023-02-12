import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;
const DB_URL = process.env.DB_URL;

const config = {
  SECRET,
  DB_URL,

};

export default config;