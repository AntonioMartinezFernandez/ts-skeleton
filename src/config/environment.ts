import { config } from 'dotenv';
config({ path: `${process.env.NODE_ENV || 'development'}.env` });

export const NODE_ENV: string = process.env.NODE_ENV as string;

export const PORT: number = parseInt(process.env.PORT as string);
