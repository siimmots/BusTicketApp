<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trip;

class TripController extends Controller
{
    public function getTrip(Request $request)
    {
        if ($request->has("id")) {
            $trip = Trip::find($request->get("id"));
            if (is_null($trip)) {
                return [];
            } else {
                $tripStops = [];
                // $tripStops[] = $trip["origin"];
                foreach ($trip->stops as $stop) {
                    if (!in_array($stop["name"], $tripStops)) {
                        $tripStops[] = $stop["name"];
                    }
                }
                if (!in_array($trip["destination"], $tripStops)) {
                    $tripStops[] = $trip["destination"];
                }
                return $tripStops;
            }
        } else {
            return Trip::all();
        }
    }
}

/*
        $trips = [];
        $tripWithStops = "";
        foreach (Trip::all() as $trip) {
            $tripWithStops .= ucfirst($trip->origin . "-");

            foreach ($trip->stops as $stop) {
                $tripWithStops .= ucfirst($stop->name . "-");
            }
            $tripWithStops .= ucfirst($trip->destination);
            $trips[] = $tripWithStops;
            $tripWithStops = "";
        }

        return $trips;

*/
