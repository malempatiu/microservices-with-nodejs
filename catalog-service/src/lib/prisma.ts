import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import {config} from "@/config/config";


const adapter = new PrismaPg({ connectionString: config.dbUrl })
const prisma = new PrismaClient({ adapter })

export { prisma }