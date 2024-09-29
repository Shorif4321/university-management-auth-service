import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
);

// get single departments
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

// delete single departments
router.delete('/:id', AcademicDepartmentController.delelteDepartment);

// update departments
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateDepartment,
);

// get all departments
router.get('/', AcademicDepartmentController.getDepartments);

export const AcademicDepartmentRouter = router;
