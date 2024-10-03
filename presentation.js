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
  } */  //  + return newUserAllData 
//


// 15-11: Create student route , controller , constant







