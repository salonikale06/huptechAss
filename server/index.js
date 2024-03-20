import express from 'express'
import dotenv from 'dotenv';
import db from './database/db.js';
import cors from 'cors';
import routes from './routes/routes.js';
dotenv.config();

db();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',routes);

const port = process.env.port;
app.listen(port,()=>{
    console.log(`server Started at ${port}`);
})