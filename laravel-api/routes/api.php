<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/sanctum/csrf-cookie', CsrfCookieController::class);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('tenants', TenantController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class);
Route::apiResource('users', UserController::class)->middleware('auth:sanctum');

Route::post('/roles/{role}/permissions/{permission}', [RoleController::class, 'assignPermission']);
Route::delete('/roles/{role}/permissions/{permission}', [RoleController::class, 'removePermission']);
Route::post('/users/{user}/roles/{role}', [RoleController::class, 'assignToUser']);
Route::delete('/users/{user}/roles/{role}', [RoleController::class, 'removeFromUser']);

Route::post('/permissions/{permission}/roles/{role}', [PermissionController::class, 'assignToRole']);
Route::delete('/permissions/{permission}/roles/{role}', [PermissionController::class, 'removeFromRole']);
Route::post('/users/{user}/permissions/{permission}', [PermissionController::class, 'assignToUser']);
Route::delete('/users/{user}/permissions/{permission}', [PermissionController::class, 'removeFromUser']);
