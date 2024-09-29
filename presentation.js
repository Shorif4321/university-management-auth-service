// 14-1: Handle Not Found Route
// we can make env vaiable in postman ,
//then in route {{UMA}}/academic-semeser/create-semsester - ager motoi same kaj korbe / {{UMA}}/lalalaala ei valie hit korle = Cannot POST /api/v1//lalalaala ta show kore but amader eivabe na kore error message er akare response dorkar , eitao ek prokar error, kintu eta globalErrorHandelar diye solve korbo na karon eta not-found  route a hit korle hocce,,
// app.ts make handle not found after all app.use = kon app.user na mille amader ke // handle Not found
/* app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: {
        path: req.originalUrl,
        message: 'API Not Fount',
      },
    });
    next();
  }); */ // again postman hit =  {{UMA}}/lalalala

//   14-2: What is pagination , Create Semester Controller
// academicSemester.controller.ts file write getAllSemester functino +
// ekta object paginamtionOptions + result = copy code from upper functin + export getAll Funtion +
//call in AcademicSemester.service.ts file write getAllSemester function + function get parametter with type + export + import the function in AcademicSemester.controller.getAllSemester + call the function and stored in result  + send data
// call router.ts = routr.get('/',AcSemiColtroler.getAllService)
// paginamtionOptions object ke ekta common file a niye jabo , share + pick.ts file , picker moode duita parameter thakbe ekta object  arekta array= kon kon field gulo filter korbo
// object er type ki hbe amara jani na so generic type use korbo
// <T extends of objtct> = T er type hbe object  // keys kar key keys hocce object er key = k extends keyof T
// <T extends of objtct>  object er poriborte Record<string , unknown> use korbo
// const finalObject = {}
// keys ekta array jar monne ['page', 'limit', 'sortBy','sortOrder'] ei rokom
// for(const key of Keys) + if (obj && Object.hasOwnProperty.call(obj,key)) = jodi object thake ebong amader pathano object er vitore nijosso property hisebe key ta thake tbe tumi finalObject er vitore key, value hisebe paire kore daw =
// retun and uporet return type Partial<T> + export pick + impot
//  const paginamtionOptions = pick(req.query,['page','limit','sortBy','sortOrder'])
//['page','limit','sortBy','sortOrder'] = eita sobar jonne comon so eitake const file baniye nibo == make constants folder in src + pagination.ts
// export const paginationField = ['page','limit','sortBy','sortOrder'] +
// const paginamtionOptions = pick(req.query,paginationField) + import + log + hit in postman = {{UMA}}/academic-semesters/?page=1&limit=10
// output in teminal = { page: '1', limit: '10' }

// 14-4: Implement Pagination using page , limit and skip
// remove code that is comment and upcommetn result code  from AS.controller.ts
// go to academicSemeterService.ts = distrucring page and limit from paginationOption
// user page and limit diteo pare nao pare so set defult number 1 and 10
// skipp banate hbe + model a questy korte hbe + getAllSemester Return korbe ekta <IAcadimcSemester>
// retun asbe ekta formate a return { meta:{page,limit, total },data:result} ei data type ta ektu vinno , so etar jonne ekta data type banabo  IGenericResponse =

// 14-5: Implement Dynamic Sorting
//pagination sob page use korbo , student, facalti, admin sobar jonnei
// pagination er calculation sob router jonne o hbe, so eitake difrent akta page a niye jabo + make folder in src + helpers => paginationHelpers.ts == const calculatePagination=(options:)=> ++ decalre type for option
//  .sort({ year: 'desc' }) // hit on post man = {{UMA}}/academic-semesters/?page=1&limit=3
// but frontend theke kew sortBy year na diye title dite pare so eitake dinamic kore dibo
// sort korar somoi user kon kicu select na korleo by default {'CreatedtAt':'desc'} akare sort korbe
// in paginatioHelper.ts Ioption take two parameters  sortBy?:string sortOrder?: SortOrder
// add two option in every opton in paginatioHelper.ts
// received sortBy and sortOrder in academicSemester.service.ts by distructuring and make a object set key and value in object + use the object in sort()
// {{UMA}}/academic-semesters/?sortBy=code&&sortOrder=desc   {{UMA}}/academic-semesters/?sortBy=year&&sortOrder=asc

// 14-6: What is searching and filtering
// search partial match  , filter exact matched
// make const filters = pick(req.query,['searchTerm])
// {{UMA}}/academic-semesters/?searchTerm=Autum
// academicSemster.service.ts = filters: IAcademicSemesterFilters, make type for filter IAcademicSemesterFilters = cut and paste in academicSemester.interface.ts + export

// 14-7: Implement Dynamic Searching
// searchTerm distructuring from academicSemester.service.ts  + make vaiable andCondionts ={$or[{}]} ==see the code  + call andCondition in find({andConditions})
//hit postman {{UMA}}/academic-semesters/?searchTerm=03 03 change kore "au" abar "fa" diye search korbo
// again search implement on "code"
// check /?searchTerm=03 + search implement on "year" = check /?searchTerm=2026
// andCondionts ekta repeted task so amra search filed ke akta array baniye tar opre map kore use korlei hbe == see academicSemester.service.ts + {{UMA}}/academic-semesters/?searchTerm=autu

// 14-8: Implement Dynamic Filtering
// add value in const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code']);
//  const { searchTerm, ...filtersData } = filters;  in service.ts file
// if code block    if(Object.keys(filters).length){}
// log filters in contorller + log filtersData in service.ts
// if (Object.keys(filtersData).length) {
//   andConditions.push({
//     $and: Object.entries(filtersData).map(([field, value]) => ({
//       [field]: value,
//     })),
//   });
// }
// exact math  hbe filter ar jonne   = {{UMA}}/academic-semesters/?title=Autumn = {{UMA}}/academic-semesters/?year=2023&title=Autumn
// code optimaize =    const academicSemestersSearchableFields = ['title', 'code', 'year']; + paste in  academicSemester.constant.ts file + export + import in service.ts file +
// copy  ['searchTerm', 'title', 'year', 'code'] + paset in constant.ts + export + import

// 14-9: Fix an error and create single semester
// {{UMA}}/academic-semesters hit korle error dibe  = AcademicSemester.find()  find empy kore dile kaj krob
//searching ba parination thakteo pare nao pare so,, eita optional banate hbe, i mean pagination ba search ba filter charao api load korte hbe
// where condition in academic.service.ts filev  == {{UMA}}/academic-semesters/?searchTerm=Autum&page=1&limit=2

// get single documents
// router.get('/:id', AcademicSemesterController.getSingleSemester) // create getSIngleSemeste in controller.ts file // must above the router.get('/) + getSingleSemetes in contorler do code see the upper fucnton + getSineleSemester in service.ts + do code see upper code funcitn
// solve error  + {{UMA}}/academic-semesters/66f4215d2f42a3d0d11cadd1

// 14-10: Handle Cast Error
// {{UMA}}/academic-semesters/66f4215d2f42a3d0d11cadd1  eivabe hit korle amara data pacci but jodi id er last number chage kroe hist kori tbe data pabo na == abar id theke koyekta number remover kore hit korele cust error dibe {{UMA}}/academic-semesters/66f4215d2f42a3d0d1
// globalErrorHandelar.ts = CastError with if condition + res.status(200).json({error}) = hist with single id
// make handleCastError for simplyfied  in Error Folter = handleCastError.ts == see
// check by hit on wrong id

// 14-11: Update Academic Semester
//in academicSemester.route.ts file make app.patch('/',academicSemesterController.updateSemester) = above the get route
// make updateSemester + catchAsync + copy code from another function + paste here
// update er jonne duita jinis lagbe kake update korbo = id , ki update korobo = data  + {{UMA}}/academic-semesters/66f421652f42a3d0d11cadd4
// body te ekta data asbe setake controller receive korbe + setak service pathiye debo
// in controller.ts  const result = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload);
// {{UMA}}/academic-semesters/66f421652f42a3d0d11cadd4 = updae hoice seta database check korle ba + get route a postman hit korle dekhbe , but {{UMA}}/academic-semesters/66f421652f42a3d0d11cadd4 hit korle asbe na karon update korar pore new data rutun kortece na = after payload, {new:true} , new datake true kore daw
// const result = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload, {new:true}); + {{UMA}}/academic-semesters/66f421652f42a3d0d11cadd4 + in postman tittle and year update korbo + then tittle, year, code update krote paro =
// {
//   "title":"Fall",
//   "year":"2031",
//   "code":"01"
// }
// code=01 hole ager create kroar validation ke overwrite kortece , so etakeo solve korte hbe

//   "title":"Fall",
//   "year":"2031",
//   "code":"01"
// }
// code=01 hole ager create kroar validation ke overwrite kortece , so etakeo solve korte hbe
// 14-12: Implement validation on update
// Ensure: Route Level: update ==> give me title and code both , neither
// Ensure2: Service Level: Update ==> mapping title:code
// make updateAcademicSemesterZodSchema in academicSemesterValidation.ts file = see ===>
// .optional() call korte hbe .. ta na hole sob ooption theke error dibe
// in route call validationRequest and give updateAcademicSemesterZodSchema this as value
// validateRequest give error for type = solve it in validateRequest.ts file  = (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
// {{UMA}}/academic-semesters/66f421652f42a3d0d11cadd4 = ekta property diye hit korle error dibe
// {
//   "title":"Fall"
// }

// {
//   "title":"Fall",
//   "code":"02",
// } // duita dile kar kobe but fall er jonne code je 03 hote hbe setake chek krotece na, ei problem ta servie layer a korte hbe

// academicSemesterService.ts =
// if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
//   throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
// } // copy from create academicSemeste and paste in update academic semster with payload.title && payload.code && condition
//   "title":"Fall",
//   "code":"02",
// } // with the value hit postman update {{UMA}}/academic-semesters/id , ekta propery dile route lavel validation check korbe ar wrong code dile service theke validation korbe

// 14-13: Practice and Create Academic faculty Module
// Error: Cannot set headers after they are sent to the client === in terminal see this
// coder moode response pathanor pore jodi kon ekta kaj korteco ba next kon ekta middleware ke call korteco, sei middleware abar tomar header ta set korar try kortece, tokhon tomar kace ei eror ta ase ,= tumi to client ke ekbar header pathiye dico tai na ? er por tumi abar kano set korba, so error dicce
// academicSemester.controller.ts a sendResponse er pore next() ke call deya ace , tar mane response ekbar client ke deyar pore abar next() ke call dicce -- response er pore ar next() dorkar nai
// remove next() + next:Nextfunction from academicSemester.controller.ts and user.controller.ts + globalErrorHandelar.ts
// amar sob kaj ses korar pore response pathai , response er proe kon kaj ar hbe na
// update api + hit korle ar error dibe na

// delete korbo
// create route in route.delete('/',academicSemesterController.deleteSemester) + acacdemicSemester.controller.ts + acacdemicSemester.serive.ts
// postman his delete by id

// create a new academic faculty
