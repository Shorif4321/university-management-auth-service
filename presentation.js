// 13-1 : Fix Some Previous Errors , Improve of your codd
// in globalErrorHendelar Request, Response, and do this const globalErrorHandelar: ErrorRequestHandler = (error, req, res, next) => {
// same for users.controller.ts =  const createUser: RequestHandler = async (req, res, next) => {
// user.model.ts file change object to ==  Record<string, unknown>
// amara chai amader user er type gulo ek file a thakbe so.. copy type UserModel = Model<IUser, Record<string, unknown>> from user.model.ts and paset in user.interface.ts file + export and import in user.mode.ts file
//cnage all users to user.fileName in user files
// export default {createUser,} chage to   export const UserService = { createUser,} in user.service.ts file
// in user.controller = await UserService.createUser(user)
// same in  user.controller.ts file export system  ==  export const UserController = { createUser} === in user.routes.ts router.post('/create-user', UserController.createUser)  == same export parttern for user.route.ts file  + call in app.ts file
// check error in postMan by hits on create-user route with rolex value
// custom error o dekhbo so app.ts ucomment test api route + hit postman with get == ehaneo ekta same formate a error show korbe



// 13-2 : Fix Error Log , Gracefully off your server
//env development hole erros log kore dekhabe ar jodi production hoi tbe errorLogger er moodde error save kore rakhbe
/*
config.env === 'development'
 ? console.log('🧨globalErrorHandler', error)
 : errorLogger.error('🧨globalErrorHandler', error)
 */

//unhandle rejection
// Testing
/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    Promise.reject(new Error('Unhandle promise rejection'))
  }) */ // hit in postman get error in terminal
// ei dhoroner unhandle promise jano server ke off kore na dei / porject jano crush na kore so etake solve korte hbe = vodro vabe server off = Gracefully off your server == ager server er sobkicu off korbe then process ke offf kore dibe

// let server: Server
// import Server form http + app.listen set in server
/* process.on('unhandledRejection', error => {
  console.log('UnhandleRejection is detected, we are clossing our server....')
  if (server) {
    server.close(() => {
      errorLogger.error(error)
      process.exit(1) // node process of
    })
  } else {
    process.exit(1)
  }
}) */



  
// 13 - 3: Finish Your Error Handeling Setup  == server.ts
// uncought Exception = developer hisebe coder modde vul kora=
// console.log(x) = but x is not define = hit in postman get
// call process.on in server.ts file after bootstrap()
// coder vitor ba baire je kon jaigai hote pare so etake sobar upore kobo ebong  sycncronys porcess a kaj kore so sobar upore likhbo == after import /

// Sigterm / signal termination == onekta ager mtoi = code hothat e off hoye jawa, terminal off hoye jawa = manager/pm2 ba kon ekta singla pathabe ar process ta off kore dibe = code wll be after bootstrap() == let server ke bootstrap er baire nite hbe

/* process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
*/  // throw new Error('testing error loager') in testing route + hit postman



//13-4 : What is Zod , Implement one extra layer of validation
// user.controller.ts ki data asbe, array naki string eigulo validation kore = ke kore model
// but amader jodi emon hoi je password 5 carecter, 2specail charecter, number add korte hbe, ei rokom pattern er jonne amar ekta validation packege use korbo ,, prothome pahara dicce senabahini(package) then polish(model), taile senabahinir sequrity par korte parle pulish to kicu na -- package to hocce zod = zod.dev + introduction- zod typescript schema first
// zod.dev + requremnets + npm install zod + go to user.controller.ts
// user.controller er vitore zod valitaion korte hbe + import zod + zod schema banate hbe =
/* const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required',
    }),
    password: z.string().optional(),
  }),
}) */
// async await for req async await = await createUserZodSchema.parseAsync(req)
// hit postman create user = array of object akare err dicce but amara error take ager moto errorHandelarMoto ekta pattern a nite hbe



// 13-5: How to organize your zod validation
// zod er ei validation ta sob somoi sobar / jotogulo controller babohar korbo sobar validationer jonne babohar korbo
// requst ta app.ts => user.route => coontroller => service
//studnet route, admin route, facltiy e rokom onek route hbe so amara validation ta route a diye dibo
// create user.validation.ts file in user folder
// copy zod validation and paste in user.validation.ts file + solve import issue + export const UserValidation = {createUserZodSchema}
// export take use korbo kotha? =
//router.post('/create-user', validateRequest, UserController.createUser)
//prothome '/create-user' route hit korbe,, then validateRequest a zod kaj korbe then seta thik thakle poroporti middleware  UserController.createUser ar kace pathiye dibe
//make a file vallidateRequest.ts in middlewares folder
// call the middelware in user.router.ts as a function and pass and give the parameters in validateRequest(Uservalidation.createUser)



//13-6: Create ZodErrorHandler
// in Zod website clt + f = seach "Error" = handle Error
// golobalErrorHandelar e validation err er pore jod error check korbo = globalErrorHandler.ts
// make a handleZodError.ts file in error file and export + call in globalErrorHandelar
// errror pattern dekhte hbe = console.log(error.errors.map(err => err.path),'eta zod error',);
// handleValidationError dekhe dekhe korte hbe ,, type and return type thik kore korte hbe = chen by hit on postman



// 13-7 : Create Academic Semester Interface , Model
// create a folder = academicSemester in modules folder and academicSemester.interface.ts file     decalare type by see mongooes dock + create static model type
// create academicSemester.interface.ts = code copy from user.model and pase on this file and modify


// 13-8 Create Academic Semester Validation ,Improve interface , schema.
// change the type in in academicSemester.interface.ts with litarel type with enum
// make a type for month = chat GPT = make a typescript type for month + copy code and pste in interface file and use in startMonth:Month
// set enum in academicSemester.model.ts = // but startMonth er enum onek boro ekta array so etake upore declare kore enum:Month eivabe use korbo
// make validation academicSemester = make file academicSemester.validation.ts + copy code from user.validation.ts and modifiy as the academic interface property title: z.enum({required_error:'title is required'})
// make academicSemester.route.ts file = copy user.route.ts and modify code 



//13-9 Create Academic Semester Constants.
// amra academicSemester.model and academicSemester.validation.ts file a eki array use korteci, abar  ['01', '02', '03'] and ['Autumn', 'Summer', 'Fall'] era common ja koyek jaigai use hocce, ei code gulo repet na kore use korar jonne arekta file nibo . sei file a code gulo const varibale akare rekhe jekhen jekhen repect ace sekhen se khane babohar korob 
// make academicSemester.constant.ts file in academicSemester folder
//make academicSemesterMonth but ei ta type chaibe type ta amader interface a bananoi ace setake jsut export kore dilei hbe
// use the academicSemesterMonth in academicSemesterModel.ts file (startMonth and endMonth) =  enum: academicSemesterMonths
//same for academicSemester.validation = error == solve [...academicSemisterMonth] as [string,...srtinr] = prothom enum ta string bakigulo string array




// 13-10: Create Academic Semester , Service , Controller , Route
// create academicSemester.service.ts and see this file 
// create academicSemester.controller.ts and see this file + copy user.controller code and paste in academicSemester.controller.ts file and modifi + export + call in route.ts file with modifiy
// in app.ts make route app.use('/api/v1/academic-semesters',AcademicSemesterRoutes) + postman hit == if you get error solve the error


// 13-11 Handle Same Year Same Semester Validation
// same year and same semester => duplicate entry not allowed , eki name duita semester eki year a ekata universtity te thakbe na == handlelling same year and same issue, eita solve korar jonne mongodb te dui dhoroner hook chano jai = (1) pre-hook, (2) post-hook(post korar pore action) 
// (1) pre-hook = database a data check korara agei data chek korbo je same year a same semeste ace ki na
// academicSemester.model.ts file write pre hook code == see the file
// pre hook
/* academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError();// eikhane status deyar onne packe install korbo (npm i http-status)
  }
    next()
}); */
// npm i http-status +  const status = require('http-status'); + throw new ApiError(status.CONFLICT, 'Academic Semester is Already exist !') 
// ar same semester na thakle next er moode pathiye dibe ,, eita express er next na, eita mongoese er next() 
//delete the database collection from mongodb +  hist on postman and see result + hit again with same data = data insert again but eita hoya uchit na 
// amara validation ta model er pore diyece so age data insert hocce then validation er kace astece so ei pre validation ke model er  upore niye jabo


// 13: 12: Ceate Semester Code Validation in service layer
// tittel er sahte coder maper banate hbe = make in acamdemicSemester.constang.ts file
// make conditin in academicSemester.service.ts   
/* if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
} */



  // 13: 13 Optimize Application Routes and Controllers
  // amra router jonne bar bar app.use('/user') call korteci , app.use('/route') er jonne ama ekta route file crate korbo  == note: app.use ekta middleware so etake amra middleware er vitore niye rakhte pari but amar router jonne ekta folder banabo 
// in app folder make routes folder = index.ts in route folder + make array for route and use loop by forEach


// controller optimaization
// make a folder in catchAsync.ts in shared folder + make function catchAsync(fn) = ei function paramitter hisebe arekta function ke receive korbe 
// catchAsync(fn) ta try catch use korbe ja user.controller and academicSemestr ra use korbe 
// export catchAsync(fn) function as default + use in user.controller and academicSemester.controller.ts file



// 13:14 Optimize Your Try-Catch Block and Api Response
// function er type bole dibo RequestHandelar, RequestHandelar call korle next dite hbe + jekhane jehane ei function call koreci sekhane sekhane next ke call dite hbe = academicController ba userController er vitore
// user.controller and academicSemestr.controller er response er jonne ekta file niye kaj korbo
// in shared folder + sendResponse.ts + make sendResponse function + data is object , object type declared
