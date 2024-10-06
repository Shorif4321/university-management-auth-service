// 15-1: Overview of User Roles , Create Enums
// creae enums folder in src,  user.ts + export enum ENUM_USER_ROLE{ SUPER_ADMIN='super_admin',ADMIN='admin',STUDENT='student',FACULTY='faculty'}
// user.utils.ts file = genarateUserId = genarateStudentId

// 15-2: Create generateStudentId() utility and test it
// chage findLastUserId to findLastStudentId + let to const incrementalId
// ager incremental id er sathe year ar last dui digit + code and ager id set kore incrementalId er moodei update korteci =  incrementalId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementalId}`   + console.log(incrementalId);
// test kore dekhar jonne app.ts a const acdemicSemester = {code:'01',year:'2025'}
// create function = const testId = async()=>{const testId = await generateStudentId(academicSemester) console.log(testId) } + call the function

// 15-3: Create generatefacultyId() utility and get some bug to enjoy
// create new  findLastFacultyId + generateFacultyId  test in app.ts + in user.service.ts file chage generateUserId to generateStudentId + send data +
// user.controller.ts file {...user} + in postMan check by users/create-user post + {"role":"student"} + secondtime hit korele id string akare jog hbe ==== solve (ager puro id ke niye tar sathe 1 jog kortece = ager id theke last 5ta number ke retutin hisebe niye tar sathe 1 jog korte hbe)

// 15-4: Fix the bugs and test student and faculty
// user.utils.ts file =  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
// delete wrong data from database
//  set faculty in postman role + hit + chage id in database (F-00001) and update + user.utils.ts save = see console log id = F-00NaN
// lastFaculty ba lastStudentId bananor somoi finder vitore roler opore depend kore dibo ==
// const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 }) == ager mototi F-00NaN dibe kenona amder ke database theke id dicc F-00NaN jar sathe 1 jog kroa jacce jan,, so ei id ke return korar somoi F- ke bad dibo
// return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// postman hit again create-user route = id kintu student er ta create hbe ,, karon user.server.ts file a generateStudentId call kora , route a hit korle generateStudentId hit hocce === chage generateStudentId to generateFaculyId + hit postmang again
// ekoi route a hit kore amara student / faculty / admin banacci - eta uchita na so amara difrent difrent route banabo

// 15-5: Requirement Analysis of Student ,Multiple Database write operation = just see the video on programmin hero
// 15-6 :Modify User Model , Schema _ Create Student Schema , Model
// in user.mole.ts  add student:{type:Schema.Types.ObjectId,ref:'Student'} + same for faculty and admin
// student?: Types.ObjectId | IStudent;
// create  studnet in modules + student.model.ts + create schema and property requred
// export type IStudent = InferSchemaType<typeof StudentSchema>;   InferSchema diye ak line a Schema ses
// import IStudent type in user.interface.ts file

// 15-7: Face a bug , create mongoose schema and zod schema
// route a gele sutdent er propery zod validatinoa  niye jabe  --- see user.validation.ts file
// zod validationer er enum and and student.model er gender and bloodGroup bar bar repeeted hocce so eitake student.const.ts file a niye export kroe dibo
// user.validation.ts and user.modle a seta user korbo
// student.interface + user validtion make carefully

// 15-8: Refactor route , controller , service student interface , model, validation
// from user.route chage create-user ==> create-student  + chage function createUser ==> createStudent

// datake duita vage vag kore nibo + seguloke service.ts a pathabo +
//role set korob + //SET ROLE
//   user.role = 'student';
//   const academicsemester = await AcademicSemester.findById(
//     student.academicSemester,
//   );

//student er id genare korte hbe ==   const id = await generateStudentId(academicsemester);
// genarate  student id
//   const id = await generateStudentId(academicsemester);

// 15-9: Create User-Student using Transaction and Rollback
//multiple oparetion ke ekta unit(Atomic Unit) hisebe chinta korata hocce transaction = jodi multiple oparetion er kon ta fail hoi tbe ager obosthai firiye nibe eita hocce roleback,
// hoi multiple oparetion ekbare successfull hbe or kontai hbe na, ekta unit hoye succesfull hbe = transaction
// create try catch in user.service.ts + copy id = await generateStudentId() + paset in try + in catch get error
// session start before try + session.startSession + make id + set id in user and student student.id = id
// create student = const newStudent = await Student.create([student], { session });
// if for send error APIERROR , status and message
// student create sesese ekta id paya jabe setake user create korar somoi reference hisebe diye dibo = user.student
// user.student = newStudent[0]._id;
// then newuser create korbo ==    const newUser = await User.create([user], { session }); + if condition and show apiError
// transition commit korte hbe = await session.commmitTransition() + end session = await session.endSession()
// catch e error hole settion ta abort and end kore dibo = await session.abortTransition() + await session.endTransition()
//remove previous code +

// 15-10: How to populate nested fileds and return data
// etka bapar ace, userer moode student ekta reference filed and sei reference filder modde acadmicfaculty , academicSemeste, acadmic semester reference hisebe ace
// academicSemester, academicDepartment, academicFaculty populate korbo
// newUserAllData = newUser[0];
/* if (newUserAllData) {
    newUserAllData = await User.find({ id: newUserAllData.id }).populate({
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
  } */ //  + return newUserAllData
//

// 15-11: Create student route , controller , constant
// create student.route.ts = for specific user (student, admin, faculty) +  copy user.route.ts file all code paset in studnet.route.ts file
// router.get('/',StudentController.getAllStudnets)
// router.get('/:id',StudentController.getSingleStudnet)
// router.delete('/:id',StudentController.deleteStudent) + export StudnetRouter = {}
// in index.ts file make a route {path:'/students',route:StudentRoute}
//make student.controller.ts = copy academicSemester.controller.ts file code + peste in student.controller.ts file + modify code = change all function name
// filterable field an searable filed er jonne student.constant.ts file a ei duita option copy kore ante hbe from academicSemseter.constant.ts file + chage valiable name
// give value in studentSearchableFields + set value in studentFilterableField

//15-12: Create getAllStudent , getSingleStudent , deleteStudent service
// create  student.service.ts file + copy all code from academicSemester.ts file  + modify code
// IStudentFilters make in interface.ts and export + set Serach Filters value id, blooadGroup etc
// remove aupdate condinon form updateStudent
// add whereCondtions on result and countDocumantion
// get korar somoi populate korte hbe , jano academicFaculty , academicDepartment, academicFaculty sob dekhabe == so .populate('academicSemeste') + another two for department and faculty
// code comment for update
// use same populate in findById = i mean getSingleUser
// .populate('academicSemester')
// .populate('academicDepartment')
// .populate('academicFaculty')
// use same populate in findByIdAndDelete = i mean deleteStudent

// 15-13: Create update route , student validation and fix naming convention
// write router.patch in student.route.ts file + create student.validation.ts file
// only copy all user.validation.ts file + paste in student.validation.ts file + remove password and student, + chage fucntion name + export name chage
// update korar somoi je kon field update hoteo pare nao paro so sobguloke optional korte hbe == copy all updateStudentZodSchema  and go to chatGPT = past and "remove requre_error and all optional"

//15-14: Create update service and handle name object dynamically
//student.interface.ts a abmbed object = name:UserName ,, upore theke nicce, user ,, guardian:Guardian  ,, ei UserName ba Guardian a sob propery update hbe na,  jejon ekta indivusual propery update hbe , Guardian a 7ta field theke matro duita field update hbe 
// 1st jake update korbo se ace ki na check korbo = student.service.ts in updateStudent 
//  const isExist = await Student.findOne(id)  =  befaor cost reuslt = await
// by if conditon diye check korbo je student exit kore ki na, exist na korle error show
// exist korle embed field guloke distructurin kore nibo, then embeded object er ko field update korbe setao jani na so , object e jei filed e asuk setake amara dinamicly dhore nibo 
/*  if (name && Object.keys(name).length > 0) {
   Object.keys(name).forEach(key => {
     const nameKey = `name.${key}`;  //`name.firstName`
     (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];  // updatedStudentData['guardian.motherContactNo']=name["ALishorif"]
   });
 }  */


//  15-15: Dynamically update guardian , local guardian , test API_s , Fix Bugs
// uporer coder same kaj ta guardian and LocalGuardian er jonneo hote pare  copy smae code + chage name ==> guardian  + chage name to guardian by clt+d + same for localGuardian 
// change payload to updatedStudentData in result 
// delete user and student data from mongodb
// make route in postman crate user and student in user folder /== users/create-student with data + check mongodb  == check user collection id and student id same or not == 240100001 
// abar student er mongdb _id user collection a student propetyte ace ki na
// make studet forlder ,, update student route  = {{ump}}/students/240100001  {"name":{"lastName":"DIBO na"},"contactNo":"0215487963"}   = /240100001 ei id hbe amader tori kora id
// get catError student.service.ts update here ==    const result = await Student.findOneAndUpdate( { _id: id },   ===>  { id: id } emon korlei hbe  ===> 
// const result = await Student.findOneAndUpdate({ id }, eita dileo hbe  , property and value same

// 15-16: Level 2 Unviersity homework ,,
//1 generate faculty id PETTERN = F-00001 
//2 create  {{uma}}/create-faculty route in user.route.ts file
//3 Validation create faculty request in router lavel
//4 create faculty controller and servie in user.cotroller.ts file and user.service.ts file
//5 create API end point in faculty.route.ts given below (do not forget to addit in routes/index.js  file)
/*   /api/v1/faculties(GET) get all faculties implements filtering and pagination, populate reference field
    /api/v1/faculties/:id (GET) get individual faculties by id and populate reference field
    /api/v1/faculties/:id (PATCH) update facultiy data dynamicly
    /api/v1/faculties/:id (DELETE) delete individual facultiy */

//6 Validate update request using zod schema
//7 create faculty controller and service
//8 Test APIs and create data

/*
_id: ObjectID
id: string;
name:
firstName
middleName (optional)
lastName
dateOfBirth
email
contactNo
emergencyContactNo
gender
permanentAddress
presentAddress
bloodGroup (optional)
designation
academicDepartment ( reference )
academicFaculty ( reference )
profileImage (optional)
createdAt
updatedAt
*/

/*
Sample Data
{
  "_id":ObjectId("6425c04cc4edab97a3ebc749")
  "id": "F-00002",
  "name": {
    "firstName": "Mezbaul ",
    "lastName": "Persian",
    "middleName": "Abedin"
  },
  "dateOfBirth": "24-04-1998",
  "gender": "male",
  "bloodGroup": "O+",
  "email": "mezbaul@gmail.com",
  "contactNo": "01800000006",
  "emergencyContactNo": "01800000006",
  "presentAddress": "ctg",
  "permanentAddress": "ctg",
  "designation": "Lecturer",
  "academicDepartment":"6429e7d524d69a1815cc37f7",
  "academicFaculty":"6429f04b3c14b1f9a7c2d97a",
  "profileImage": "https://via.placeholder.com/150x150",
  "createdAt": "2023-05-31T14:42:22.747Z",
  "updatedAt": "2023-06-01T08:54:57.058Z"
}
*/

/*
Sample Data (After Populate)

{
  "_id":ObjectId("6425c04cc4edab97a3ebc749")
  "id": "F-00002",
  "name": {
    "firstName": "Mezbaul ",
    "lastName": "Persian",
    "middleName": "Abedin"
  },
  "dateOfBirth": "24-04-1998",
  "gender": "male",
  "bloodGroup": "O+",
  "email": "mezbaul@gmail.com",
  "contactNo": "01800000006",
  "emergencyContactNo": "01800000006",
  "presentAddress": "ctg",
  "permanentAddress": "ctg",
  "designation": "Lecturer",
  "academicDepartment": {
    "_id": "6429e7d524d69a1815cc37f7",
    "title": "Department of Computer Science and Engineering",
    "createdAt": "2023-05-28T21:24:53.677Z",
    "updatedAt": "2023-05-28T21:24:53.677Z"
  },
  "academicFaculty": {
    "_id": "6429f04b3c14b1f9a7c2d97a",
    "title": "Faculty of Science and Engineering",
    "createdAt": "2023-05-28T21:24:53.677Z",
    "updatedAt": "2023-05-28T21:24:53.677Z"
  },
  "profileImage": "https://via.placeholder.com/150x150",
  "createdAt": "2023-05-31T14:42:22.747Z",
  "updatedAt": "2023-06-01T08:54:57.058Z"
}
*/
// student
/* [
  {
    id: '240100003',
    name: {
      firstName: 'Mamma',
      middleName: 'Isa',
      lastName: 'ALi',
      _id: new ObjectId('67014f8867595a6b825146a2')
    },
    dateOfBirth: '24-04-1998',
    gender: 'male',
    bloodGroup: 'O+',
    email: 'mann@afgmail.com',
    contactNo: '0179649af11068',
    emergencyContactNo: '011fa600000000',
    presentAddress: 'Rajshahi',
    permanentAddress: 'Rajshahi',
    guardian: {
      fatherName: 'MD. Baba',
      fatherOccupation: 'na bollei ki na?',
      fatherContactNo: '01600000000',
      motherName: 'Mrs. Ma',
      motherOccupation: 'Housewife',
      motherContactNo: '01600000000',
      address: 'Rajshahi',
      _id: new ObjectId('67014f8867595a6b825146a3')
    },
    localGuardian: {
      name: 'Md. Mahbubur Rahman',
      occupation: 'Business man',
      contactNo: '01800000000',
      address: 'Dhaka',
      _id: new ObjectId('67014f8867595a6b825146a4')
    },
    academicFaculty: new ObjectId('66feaa92844bd45343b3cfb9'),
    academicDepartment: new ObjectId('66f95f4acee8c40620a4e4c1'),
    academicSemester: new ObjectId('66f421562f42a3d0d11cadce'),
    _id: new ObjectId('67014f8867595a6b825146a1'),
    createdAt: 2024 - 10-05T14: 39:04.265Z,
    updatedAt: 2024 - 10-05T14: 39:04.265Z,
    __v: 0
  }
] */

/* 
[
  {
    id: 'F-00005',
    name: {
      firstName: 'Mamma',
      middleName: 'Isa',
      lastName: 'ALi',
      _id: new ObjectId('670151a4a2acb2b3df057bd5')
    },
    dateOfBirth: '24-04-1998',
    gender: 'male',
    bloodGroup: 'O+',
    email: 'manu@afgmail.com',
    contactNo: '0179649af11068',
    emergencyContactNo: '011fa600000000',
    presentAddress: 'Rajshahi',
    permanentAddress: 'Rajshahi',
    academicFaculty: new ObjectId('66f95f1fcee8c40620a4e4bf'),
    academicDepartment: new ObjectId('66f95f8ecee8c40620a4e4c7'),
    _id: new ObjectId('670151a4a2acb2b3df057bd4'),
    createdAt: 2024 - 10-05T14: 48:04.247Z,
    updatedAt: 2024 - 10-05T14: 48:04.247Z,
    __v: 0
  }
]
 */