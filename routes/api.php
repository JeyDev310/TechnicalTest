<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['prefix' => '/v1', 'middleware' => ['auth:api'], 'namespace' => 'Api\V1', 'as' => 'api.'], function () {
Route::group(['middleware' => 'api',], function () {
    Route::group(['prefix' => 'v1'], function(){
        Route::get('/getCompanies', 'Api\V1\CompanyController@index');
        Route::post('/insertCompany', 'Api\V1\CompanyController@insert');
        Route::post('/updateCompany', 'Api\V1\CompanyController@update');
        Route::post('/deleteCompany', 'Api\V1\CompanyController@delete');
        Route::post('/uploadFile', 'Api\V1\CustomController@uploadFile');
    });
});