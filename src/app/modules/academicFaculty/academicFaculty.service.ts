import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create single faculty
const createFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const AcademicFacultyService = { createFaculty };
