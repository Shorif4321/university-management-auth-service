/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express';
import { IGenericErrorMessage } from '../interfaces/error';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import ApiError from '../errors/ApiError';
import { errorLogger } from '../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandelar: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction,
) => {
  //env development hole erros log kore dekhabe ar jodi production hoi tbe errorLogger er moodde error save kore rakhbe

  config.env === 'development'
    ? console.log('🧨globalErrorHandler', error)
    : errorLogger.error('🧨globalErrorHandler', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  // validation error
  if (error?.name === 'ValidationError') {
    // handleValidationError ei function error ke niye jabe ei function then errorke simply kore ane uporer let variable a man chage korbe
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // zod error
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  //cast error
  else if (error?.name === 'CastError') {
    // res.status(200).json({ error });
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // ApiError
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // normal Error
  else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // error tructure
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};
export default globalErrorHandelar;
