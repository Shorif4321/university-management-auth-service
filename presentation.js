// 15-1: Overview of User Roles , Create Enums
// creae enums folder in src,  user.ts + export enum ENUM_USER_ROLE{ SUPER_ADMIN='super_admin',ADMIN='admin',STUDENT='student',FACULTY='faculty'}
// user.utils.ts file = genarateUserId = genarateStudentId


// 15-2: Create generateStudentId() utility and test it
// chage findLastUserId to findLastStudentId + let to const incrementalId
// ager incremental id er sathe year ar last dui digit + code and ager id set kore incrementalId er moodei update korteci =  incrementalId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementalId}`   + console.log(incrementalId);
// test kore dekhar jonne app.ts a const acdemicSemester = {code:'01',year:'2025'}
// create function = const testId = async()=>{const testId = await generateStudentId(academicSemester) console.log(testId) } + call the function

