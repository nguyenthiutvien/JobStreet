<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
// Company
Route::get("/company",[CompanyController::class,"index"]);
Route::post("/company",[CompanyController::class,"store"]);
Route::get("/company/{email}/edit",[CompanyController::class,"edit"]);
Route::put("/company/{email}/confirm-email",[CompanyController::class,"confirmEmail"]);
Route::put("/company/{email}/change-pass",[CompanyController::class,"update"]);
Route::post("/company/login",[CompanyController::class,"EmployeeLogin"]);
Route::post("/company/get-token/{token}",[UserController::class,"getCompanyToken"]);

Route::group(['middleware' => 'api'], function ($router) {
    Route::resource('/categories', CategoryController::class);
    Route::resource('/applications', ApplicationController::class);
});

//job
Route::get('/home',[JobApiController::class,'index']);
Route::get('/home/browse',[JobApiController::class,'getALlJobs']);

Route::get('/home/{id}',[JobApiController::class,'getJobDetails']);


// Application
Route::post('/applications',[ApplicationController::class,"store"]);

Route::get('/companies/selectdata', [CompanyController::class, 'selectdata']);

Route::get('/companies/selectdata/{id}', function (Request $request, $id) {
    $controller = new CompanyController(); 
    return $controller->getCompany($request, $id);
});
<<<<<<< HEAD
Route::get('/get-applications',[ApplicationController::class,"index"]);

Route::get('/get-applications/{user_id}/{job_id}', [ApplicationController::class, 'getApplication']);
Route::get('/applications/{user_id}/{job_id}/cv', [ApplicationController::class, 'getCV']);

Route::get('/applications/job/{job_id}', [ApplicationController::class, 'getApplicationsByJob']);
=======

Route::get("user/{email}/apply",[ApplicationController::class,"show"]);


Route::get("/user",[UserController::class,"test"]);

>>>>>>> 84d4411697ca66311ecf3fc6e30c80ee38d2e533
