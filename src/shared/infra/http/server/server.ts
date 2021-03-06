import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import dotenv from 'dotenv';
import AppError from '@shared/errors/AppError';
import { dataSource } from '@shared/infra/typeorm';
import router from '../routes';
import uploadConfig from '@config/upload';
import rateLimit from '../middlewares/rateLimit';

dotenv.config();

dataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(rateLimit);

  app.use(pagination);

  app.use('/files', express.static(uploadConfig.directory));
  app.use(router);
  app.use(errors());

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );
  app.listen(3333, () =>
    console.log(`Server started on port ${process.env.SERVER_PORT || 3333}`),
  );
});
