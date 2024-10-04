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



