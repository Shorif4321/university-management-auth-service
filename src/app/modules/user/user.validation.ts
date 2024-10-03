import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';
// req- validation
// body - object / data in object also a object
// data - object

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is Required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last name is Required',
        }),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z.string({
        required_error: 'Data of birth is required',
      }),

      email: z
        .string({
          required_error: 'Email is Requirede',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact Number is Requirede',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emmergency Contact Number is Requirede',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present Address is Requirede',
      }),
      permanentAddress: z.string({
        required_error: 'Parmanent Address is Requirede',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is Requirede',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Requirede',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Requirede',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is Required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father ContactNo is Required',
        }),
        motherName: z.string({
          required_error: 'Mother name is Required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is Required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother ContactNo is Required',
        }),
        address: z.string({
          required_error: 'Guardian Address is Required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian name is Required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is Required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact Nomber is Required',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is Required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
// async await for req async await
// await createUserZodSchema.parseAsync(req)
export const UserValidation = { createUserZodSchema };
