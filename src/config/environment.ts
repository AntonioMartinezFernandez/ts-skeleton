import { config } from 'dotenv';
config({ path: `${process.env.NODE_ENV || 'development'}.env` });

export const NODE_ENV: string = process.env.NODE_ENV as string;
export const PORT: number = parseInt(process.env.PORT as string);

export const SECRET_KEY: string = process.env.SECRET_KEY as string;
export const SALT_ROUNDS: string = process.env.SALT_ROUNDS as string;
export const TOKEN_DURATION: string = process.env.TOKEN_DURATION as string;
