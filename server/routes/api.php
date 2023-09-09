<?php

use App\Http\Controllers\AuthController;
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
    Route::group(["prefix" => "admin", "middleware" => "admin.valid"], function () {
        // Admin functionalities here
    });
});

Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);
