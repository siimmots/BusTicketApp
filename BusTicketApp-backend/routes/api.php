<?php

use App\Http\Controllers\TripController;
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

Route::get("/trip", "TripController@getTrip");
Route::get("/stops", "StopController@getStops");
Route::get("/allstops", "StopController@getAllStops");
Route::get("/alljourneys", "JourneyController@getAllJourneys");
Route::get("/journeys", "JourneyController@getJourney");
// Route::get("/bus", "BusController@getBus");
// Route::get("/journey/trip", "JourneyController@getJourneyTrip");
