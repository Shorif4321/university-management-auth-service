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
*/ // throw new Error('testing error loager') in testing route + hit postman

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
