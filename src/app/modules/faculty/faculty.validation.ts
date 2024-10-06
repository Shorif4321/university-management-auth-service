import { z } from 'zod';
import { facultyBloodGroup, facultyGender } from './faculty.constant';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...facultyGender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum([...facultyBloodGroup] as [string, ...string[]])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = { updateFacultyZodSchema };
