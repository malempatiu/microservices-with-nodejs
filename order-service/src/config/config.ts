import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbUrl: string;
  catalogUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DB_URL || '',
  catalogUrl: process.env.CATALOG_URL || ''
};

export {config};