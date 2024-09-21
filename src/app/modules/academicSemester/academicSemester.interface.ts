import { Model } from 'mongoose';

export type IAcademicSemester = {
  tittle: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
