<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriberController;

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


Route::get('/subscribers', [SubscriberController::class, 'index']);
Route::delete('/subscribers/{subscriber}', [SubscriberController::class, 'destroy']);
Route::put('/subscribers/{subscriber}', [SubscriberController::class, 'update']);
Route::post('/subscribers', [SubscriberController::class, 'store']);

Route::get('/blogs', [BlogController::class, 'index']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);
Route::put('/blogs/{blog}', [BlogController::class, 'update']);
Route::post('/login', [AuthController::class, 'login']);
