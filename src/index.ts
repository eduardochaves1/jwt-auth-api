import express from 'express';
import dotenv from 'dotenv';
import mongodbConnection from './db.connect';
import userRouter from './routes/user.router';

dotenv.config();
mongodbConnection();
const port = 3000;
const app = express();

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`))
