import express from 'express';
import userRouter from './routes/user.router';

const port = 3000;
const app = express();

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`))
