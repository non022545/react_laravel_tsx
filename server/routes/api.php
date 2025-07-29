<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::post('/submitcreate',[ProductController::class,'store']);
Route::get('/showvalo', [ProductController::class, 'index']);
Route::get('/showvalo/{product}', [ProductController::class, 'show']);
Route::put('/updatevalo/{product}', [ProductController::class, 'update']);
Route::delete('/deletevalo/{product}', [ProductController::class, 'destroy']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


