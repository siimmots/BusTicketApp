<?php

namespace App\Http\Controllers;

use App\Journey;
use Illuminate\Http\Request;

class BusController extends Controller
{
    public function getBus(Request $request)
    {
        // if ($request->has("origin") && $request->has("destination")) {
        //     $correctJourney = "";
        //     foreach (Journey::all() as $journey) {
        //         if ($journey["origin"] === $request->get("origin")) {
        //             if (
        //                 $journey["desination"] === $request->get("destination")
        //             ) {
        //                 $correctJourney = $journey;
        //             }
        //         }
        //     }
        //     dd($correctJourney);
        //
        //     $trip = $correctJourney->trips->first();
        //     dd($trip->buses->first());
        // }

        if (
            $request->has("origin") &&
            $request->has("destination") &&
            $request->has("departure")
        ) {
            $journey = Journey::where("origin", $request->get("origin"))
                ->where("destination", $request->get("destination"))
                ->where("departure", $request->get("departure"))
                ->first();
            $trip = $journey->trips->first();
            $bus = $trip->buses->first();
        }
        return $bus;
    }
}
