import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import {config} from '@/config/config';

const dDB = drizzle(config.dbUrl!);

export {dDB};