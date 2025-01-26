import express from 'express';
import dotenv from 'dotenv-safe';
import mongodbConnection from './db.connect';
import errorHandler from './middlewares/errorHandler';
import userRouter from './routes/user.router';
import jwtAuth from './middlewares/jwtAuth';
import swaggerDocument from './docs/swagger';
import swaggerUi from 'swagger-ui-express';

const startServer = async () => {
  dotenv.config();
  await mongodbConnection();

  const port = 3000;
  const app = express();

  app
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(jwtAuth)
    .use('/api/users', userRouter)
    .use(errorHandler)
    .listen(port, () => console.log(`Server is running on port ${port}`));
}  

startServer();
