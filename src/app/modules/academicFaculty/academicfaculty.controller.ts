import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result =
    await AcademicFacultyService.createFaculty(academicFacultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

// get facultys
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result =
    await AcademicFacultyService.createFaculty(academicFacultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

export const AcademicFacultyController = { createFaculty, getAllFaculties };
