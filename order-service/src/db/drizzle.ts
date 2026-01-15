import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import {config} from '@/config/config';
import * as schema from './schema';

const dDB: NodePgDatabase<typeof schema> = drizzle(config.dbUrl!, {schema});

export {dDB};