import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateFacultyZodSchema,
};
