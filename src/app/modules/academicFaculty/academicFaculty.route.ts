import express from 'express';
import { AcademicFacultyController } from './academicfaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty,
);

router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
