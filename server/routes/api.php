<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Unaouthorized;
use App\Http\Controllers\UserController;
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

Route::group(["middleware" => "auth:api", "prefix" => "user"], function () {

    // Normal User Functionalities
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);

    Route::get('profile', [UserController::class, 'profile']);
    Route::post('updateProfile', [UserController::class, 'updateProfile']);
    
    Route::get('getMyProjects', [ProjectController::class, 'getMyProjects']);
    Route::get('getMyRecentProjects', [ProjectController::class, 'getMyRecentProjects']);
    Route::get('getProjectInfo/{project_id}', [ProjectController::class, 'getProjectInfo']);
    Route::get('getProjectTeam/{project_id}', [ProjectController::class, 'getProjectTeam']);
    Route::get('getProjectTasks/{project_id}', [ProjectController::class, 'getProjectTasks']);
    Route::post('markProjectDone/{project_id}', [ProjectController::class, 'markProjectDone']);
    Route::post('deleteProject/{project_id}', [ProjectController::class, 'deleteProject']);
    Route::post('editProjectInfo/{project_id}', [ProjectController::class, 'editProjectInfo']);
    Route::post('addProjectContributor/{project_id}', [ProjectController::class, 'addProjectContributor']);
    Route::post('removeProjectContributer/{project_id}', [ProjectController::class, 'removeProjectContributer']);
    Route::post('acceptContribution/{project_id}', [ProjectController::class, 'acceptContribution']);
    Route::post('declineContribution/{project_id}', [ProjectController::class, 'declineContribution']);
    Route::post('searchMyProjects', [ProjectController::class, 'searchMyProjects']);


    Route::group(["prefix" => "admin", "middleware" => "admin.valid"], function () {
        // Admin functionalities here
    });

});

Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);
