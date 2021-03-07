<?php

namespace App\Http\Controllers;

use App\Journey;
use App\Trip;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;
use Exception;

class JourneyController extends Controller
{
    public function getAllJourneys()
    {
        $journeys = [];

        foreach (Trip::all() as $trip) {
            $journeys[] = $trip->journeys;
        }
        return $journeys;
    }

    public function getJourney(Request $request)
    {
        // try {
        if (
            $request->has("from") &&
            $request->has("to") &&
            $request->has("date")
        ) {
            // KATKI !!!!
            //
            //
            //
            //
            // $journeys = [];

            // foreach (range(1, 3) as $i) { mitu journeyt
            //     $journeys[] = Journey::all()[$i];
            //     $journeys["price"] = Journey::all()[$i]->trip->price;
            //
            //     // $result[] = array_merge($journeys, [
            //     //     "price" => Journey::all()[$i]->trip->price,
            //     // ]);
            //
            //     $result[] = $journeys;
            //     $journeys = [];
            // }
            // // $journeys[] = Journey::all()[321];
            // return $result;

            //$stop = Journey::find($request->get("from")); // requestist saadud reis

            $journeysList = [];

            $result = [];
            $journeys = Journey::where("origin", $request->get("from"))
                ->where("destination", $request->get("to"))
                ->get();

            foreach ($journeys as $journey) {
                if (
                    Carbon::create($journey["date"])->timestamp ===
                    Carbon::create($request->get("date"))->timestamp
                ) {
                    $journeysList["journey"] = $journey;
                    $journeysList["journey"]["price"] = $journey->trip->price;
                    $journeysList["journey"]["bus"] = $journey->trip->bus;
                    // $result = array_merge($result, $journeysList);

                    // $journeysList[] = $journey;
                    // $journeysList[] = $journey->trip->price;
                    $result[] = $journeysList;
                    $journeysList = [];
                }
            }
            return $result;
        }
        // } catch (Exception $e) {
        //     echo "Caught exception: ", $e->getMessage(), "\n";
        // } finally {
        //     return $result;
        // }
    }

    public function getJourneyTrip(Request $request)
    {
        if ($request->has("origin") && $request->has("destination")) {
            $journey = Journey::where("origin", $request->get("origin"))
                ->where("destination", $request->get("destination"))

                ->first();
            dd($journey->trips->first()->price);
            $journeys[] = array_merge($journey, [
                'total_price' => 3 * $journey->trips->first()->price,
            ]);

            // dd($journey->trips->first());
            return $journey->trips->first();
        }
    }
}
