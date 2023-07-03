<?php
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\JobController;
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', [PostController::class, 'index']);
Route::post('add_posts', [PostController::class, 'store']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::put('/posts/{id}', [PostController::class, 'update']);
Route::delete('/posts/{id}', [PostController::class, 'destroy']);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// User
Route::get("/users",[UserController::class,"index"]);
Route::post("/users",[UserController::class,"store"]);
Route::get("/users/{email}/edit",[UserController::class,"edit"]);
Route::post("/users/login",[UserController::class,"userLogin"]);
Route::put("/users/{email}/confirm-email",[UserController::class,"confirmEmail"]);
Route::put("/users/{email}/change-pass",[UserController::class,"recoverPass"]);
Route::post("/user/update/{id}",[UserController::class,"update"]);
Route::put("/user/change-password/{id}",[UserController::class,"userChangePassword"]);
Route::post("/user/compare-password/{id}",[UserController::class,"comparePassword"]);
Route::post("/user/get-token/{token}",[UserController::class,"getUserToken"]);


Route::get("/user",[UserController::class,"test"]);


// Company
Route::get("/company",[CompanyController::class,"index"]);
Route::post("/company",[CompanyController::class,"store"]);
Route::get("/company/{email}/edit",[CompanyController::class,"edit"]);
Route::put("/company/{email}/confirm-email",[CompanyController::class,"confirmEmail"]);
Route::put("/company/{email}/change-pass",[CompanyController::class,"update"]);
Route::post("/company/login",[CompanyController::class,"EmployeeLogin"]);
Route::post("/company/get-token/{token}",[CompanyController::class,"getCompanyToken"]);

Route::post("/company/update/{id}",[CompanyController::class,"updateCompanyInfo"]);

Route::put("/company/change-password/{id}",[CompanyController::class,"CompanyChangePassword"]);
Route::post("/company/compare-password/{id}",[CompanyController::class,"comparePassword"]);
// Route::post("/company/get-token/{token}",[UserController::class,"getCompanyToken"]);

Route::post("/company/compare-password/{id}",[CompanyController::class,"comparePassword"]);

Route::group(['middleware' => 'api'], function ($router) {
    Route::resource('/categories', CategoryController::class);

});
Route::group(['middleware' => 'api'], function ($router) {
    Route::resource('/categories', CategoriesController::class);
    Route::resource('/applications', ApplicationController::class);
});

//job
Route::get('/home',[JobApiController::class,'index']);
Route::get('/home/browse',[JobApiController::class,'getALlJobs']);

Route::get('/home/{id}',[JobApiController::class,'getJobDetails']);





// Application
Route::post('/applications',[ApplicationController::class,"store"]);

// 
Route::get('/companies/selectdata', [CompanyController::class, 'selectdata']);

Route::get('/companies/selectdata/{id}', function (Request $request, $id) {
    $controller = new CompanyController(); 
    return $controller->getCompany($request, $id);
});

Route::get('/get-applications',[ApplicationController::class,"index"]);

// Route::get('/get-cv/{name}', [ApplicationController::class, 'getApplication']);
Route::get('/cv/{name}', [ApplicationController::class, 'getCV']);

Route::get('/applications/job/{job_id}', [ApplicationController::class, 'getApplicationsByJob']);

Route::get("user/{email}/apply",[ApplicationController::class,"show"]);


Route::get("/user",[UserController::class,"test"]);


// jobs id
Route::get('jobs/{id}', [CompanyController::class, 'getPositionById']);

Route::get('/getuser', [CompanyController::class, 'getUser']);

Route::delete('/deleteuser/{id}', [CompanyController::class, 'deleteUsers']);




// Comment

Route::post("/comment",[CommentController::class,"store"]);
Route::get("/comment/{id}",[CommentController::class,"show"]);

Route::get('/getcompanies', [CompanyController::class, 'getCompanyname']);


// Route::get('/companies/{companyId}/applications', [ApplicationController::class, 'getCompanyApplications']);

// Route::get('/company/applications/{token}', [ApplicationController::class, 'getCompanyApplications']);

Route::group(['prefix' => 'api'], function () {
    // Đăng ký tuyến API để lấy danh sách ứng dụng theo công ty
    // Route::get('applications/{token}', [ApplicationController::class, 'getApplicationsByCompany']);

  
});

Route::get('/get-applications/{token}', [ApplicationController::class, 'getApplicationByCompany']);

Route::get('/get-jobs/{token}', [CompanyController::class, 'getJobByCompany']);

Route::post('/add-jobs', [JobApiController::class, 'addJob']);


// Route để cập nhật công việc
Route::put('/update-jobs/{id}', [JobApiController::class, 'updateJob']);

// Route để xóa công việc
Route::delete('/delete-jobs/{id}', [JobApiController::class, 'deleteJob']);

// Route::put('/applications/{user_id}/{job_id}/status', [ApplicationController::class, 'updateStatus']);
Route::delete('/deleteCompany/{id}',[CompanyController::class,'deleteCompany']);


Route::get('/datajobs',[CompanyController::class,'getdatauser']);



Route::get('/getjob', [JobController::class, 'getJob']);
Route::delete('/deletejob/{id}',[JobController::class,'deletejob']);

Route::get('/getstatus', [JobController::class, 'getStatus']);


Route::put('/selectstatus/{id}',[JobController::class,'Updatestatus']);
Route::get('/search', [SearchController::class, 'search']);

Route::put('/accept-applications/{user_id}/{job_id}', [ApplicationController::class, 'AcceptApplication']);

Route::delete('/reject-applications/{user_id}/{job_id}', [ApplicationController::class, 'RejectApplication']);
Route::get('/countenduser', [UserController::class, 'countEndUser']);
