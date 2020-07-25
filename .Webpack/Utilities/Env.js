import dotenv from 'dotenv';

const { error, parsed } = dotenv.config();

if (error) {
  throw error;
}

export default parsed;
