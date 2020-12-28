import dotenv from 'dotenv';

const { error, parsed } = dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

if (error) {
  throw error;
}

export default parsed;