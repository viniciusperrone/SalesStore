import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret: String(process.env.CONFIG_TOKEN),
    expiresIn: '1d',
  },
};
