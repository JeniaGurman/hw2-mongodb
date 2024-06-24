import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { ENV_VAR } from './constants/constans.js';
import { errorHandler, } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';


export const setupServer = () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json({ type: ['application/json', 'application/vnd.api+json'] }));

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(cors());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = env(ENV_VAR.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
