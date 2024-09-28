import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandelar from './middlewares/globalErrorHandelers';
import routers from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

// midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // application routes
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1/', routers);

export default app;

app.use(globalErrorHandelar);

// handle Not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'API Not Fount',
    },
  });
  next();
});

// Testing
app.get('/', async () => {
  throw new Error('testing error loager');
});

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});
