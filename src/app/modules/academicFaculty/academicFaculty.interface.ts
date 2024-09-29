import { Model } from 'mongoose';

export interface IAcademicFaculty {
  title: string;
  syncId: string;
}

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
