import express from 'express';
const morgan = require('morgan');
import cors from 'cors';
import mongoose from 'mongoose';
import {readdirSync} from 'fs';
require('dotenv').config();

const app = express();


app.use(cors());
app.use(morgan('dev'));
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});