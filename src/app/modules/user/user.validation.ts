import { z } from 'zod';
// req- validation
// body - object / data in object also a object
// data - object

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required',
    }),
    password: z.string().optional(),
  }),
});
// async await for req async await
// await createUserZodSchema.parseAsync(req)
export const UserValidation = { createUserZodSchema };
