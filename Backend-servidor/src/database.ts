import { Pool} from 'pg';

export const pool = new Pool ({
    user: 'postgres',
    host:'localhost',
    password: 'abc1234',
    database:'concesionario',
    port: 5432
});