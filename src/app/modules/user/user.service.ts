import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // auto genarate incremental id
  // const acaSemister = {
  //   code: '01',
  //   year: '2025',
  // };

  // const id = await generateFacultyId();
  // user.id = id;

  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //SET ROLE
  user.role = 'student';
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  // genarate  student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    // newStudent array dibe
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    // set student ==> _id into user.student

    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
