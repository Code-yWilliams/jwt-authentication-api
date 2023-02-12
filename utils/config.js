import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;

const config = {
  SECRET,

};

export default config;