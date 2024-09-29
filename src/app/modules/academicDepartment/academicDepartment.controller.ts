import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData,
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginamtionOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getDepartments(
    filters,
    paginamtionOptions,
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments Retrieved Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Department Successfully',
    data: result,
  });
});

const delelteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.delelteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Deleted Successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData,
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  delelteDepartment,
  updateDepartment,
};
