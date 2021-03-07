<?php

namespace App\Http\Controllers;

use App\Stop;
use App\Trip;
use Illuminate\Http\Request;

class StopController extends Controller
{
    public function getStops(Request $request)
    {
        // id järgi järgmised peatused
        if ($request->has("from")) {
            $stop = Stop::find($request->get("from")); // requestist saadud peatus
            $flag = false;

            if (is_null($stop)) {
                // no index
                return [];
            } else {
                $stops = []; // peatused, mis peale stop'i
                $stopNames = [];
                foreach ($stop->trips as $trip) {
                    $destinationFlag = true;
                    // tripid mis sellel peatusel
                    foreach ($trip->stops as $tripStop) {
                        // tripi peatused
                        if ($tripStop["name"] == $stop["name"]) {
                            $flag = true;
                        } elseif ($flag) {
                            // add stop if it does not already exist
                            if (!in_array($tripStop["name"], $stopNames)) {
                                $stops[] = $tripStop;
                                $stopNames[] = $tripStop["name"];
                                /*
                                if (
                                    $tripStop["name"] === $trip["destination"]
                                ) {
                                    $destinationFlag = false;
                                }
                                */
                            }
                        }
                    }
                    if (!in_array($trip["destination"], $stops)) {
                        $stops[] = $trip["destination"]; // peaks lisama destinationid nkn lõppu
                    }
                }
                // $stops[] = $trip["destination"]; // peaks lisama destinationid nkn lõppu
            }
        } else {
            return Stop::all();
        }
        return $stops;
    }

    public function getAllStops()
    {
        $allStops = [];
        $stopNames = [];

        foreach (Trip::all() as $trip) {
            // võtab tripi

            $stops["id"] = $trip->id;
            $stops["origin"] = $trip["origin"];
            foreach ($trip->stops as $tripStop) {
                $flag = true;
                // loobib tripi stope
                if (count($stopNames) > 0) {
                    // kui stopnames pole tühi -> loop
                    foreach ($stopNames as $stop) {
                        // loop stopnames
                        if ($stop["name"] === $tripStop["name"]) {
                            $flag = false;
                            break;
                        }
                    }
                    if ($flag) {
                        $stopNames[] = $tripStop;
                    }
                } else {
                    // kui tühi siis lisab kohe
                    $stopNames[] = $tripStop;
                }
            }

            $stops["stops"] = $stopNames;
            $stopNames = [];
            $stops["destination"] = $trip["destination"];

            $allStops[] = $stops;
            $stops = [];
        }

        return $allStops;
    }
}

/*
else {
                $stops = []; // peatused, mis peale stop'i
                $stopNames = [];
                foreach ($stop->trips as $trip) {
                    $destinationFlag = true;
                    // tripid mis sellel peatusel
                    foreach ($trip->stops as $tripStop) {
                        // tripi peatused
                        if ($tripStop["id"] == $stop["id"]) {
                            $flag = true;
                        } elseif ($flag) {
                            // add stop if it does not already exist
                            if (!in_array($tripStop["name"], $stopNames)) {
                                $stops[] = $tripStop;
                                $stopNames[] = $tripStop["name"];
                                if (
                                    $tripStop["name"] === $trip["destination"]
                                ) {
                                    $destinationFlag = false;
                                }
                            }
                        }
                    }
                    if ($destinationFlag) {
                        $stops[] = $trip["destination"]; // peaks lisama destinationid nkn lõppu
                    }
                }
                // $stops[] = $trip["destination"]; // peaks lisama destinationid nkn lõppu
            }
            */
