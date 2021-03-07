<?php

use App\Journey;
use App\Stop;
use App\Trip;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        // $this->call(TripTablesSeeder::class);
        // $this->call(StopTablesSeeder::class);

        $stopsData = [
            [
                'name' => 'tallinn',
            ],
            [
                'name' => 'paide',
            ],
            [
                'name' => 'mäo',
            ],
            [
                'name' => 'nõo',
            ],
            [
                'name' => 'tartu',
            ],
            [
                'name' => 'viljandi',
            ],
            [
                'name' => 'rakvere',
            ],
            [
                'name' => 'tapa',
            ],
            [
                'name' => 'karksi-nuia',
            ],
            [
                'name' => 'aegviidu',
            ],
            [
                'name' => 'põltsamaa',
            ],
        ];

        // creates stops from given data.
        foreach ($stopsData as $stopData) {
            factory(App\Stop::class)->create([
                'name' => $stopData['name'],
            ]);
        }

        // Trip nr1.
        $trip1 = factory(App\Trip::class)->create([
            "origin" => "tallinn",
            "destination" => "tartu",
            "duration" => 7920,
            "price" => 12,
        ]);

        $stop = Stop::where("name", "paide")->first();
        $trip1->stops()->attach($stop);

        $stop = Stop::where("name", "mäo")->first();
        $trip1->stops()->attach($stop);

        $stop = Stop::where("name", "põltsamaa")->first();
        $trip1->stops()->attach($stop);

        // Trip nr2.
        $trip2 = factory(App\Trip::class)->create([
            "origin" => "võru",
            "destination" => "tallinn",
            "duration" => 14400,
            "price" => 15,
        ]);
        $stop = Stop::where("name", "tartu")->first();
        $trip2->stops()->attach($stop);

        $stop = Stop::where("name", "viljandi")->first();
        $trip2->stops()->attach($stop);

        $stop = Stop::where("name", "paide")->first();
        $trip2->stops()->attach($stop);

        $stop = Stop::where("name", "tapa")->first();
        $trip2->stops()->attach($stop);

        $stop = Stop::where("name", "aegviidu")->first();
        $trip2->stops()->attach($stop);

        // Journeys

        // $journey = Journey::where("origin", "pärnu")->first();
        // $trip2->journeys()->attach($journey);

        // gives journeys to all the trips.
        foreach (Trip::all() as $trip) {
            $bus = factory(App\Bus::class)->create();

            $trip->bus()->save($bus);

            foreach (range(0, 31) as $i) {
                // create the timetable for the next month
                $duration = $trip["duration"];

                $stops = [];
                foreach ($trip->stops as $stop) {
                    $stops[] = $stop;
                }

                $stopDuration = date("H:i:s", $duration / (count($stops) + 1)); // duration between each stop

                $time = explode(":", $stopDuration); // split the duration time to seperate parts

                $stopDuration = $time[0] * 60 + $time[1] + $time[2] / 60; // convert H:i:s to only minutes

                $defaultStartTime = Carbon::now()->addDays($i); // default journey start time

                $startTime = $defaultStartTime; // copy of default start time

                $defaultEndtime = Carbon::now()
                    ->addMinutes($stopDuration)
                    ->addDays($i); // default journey end time

                $endtime = Carbon::create($defaultEndtime->toDateTimeString()); // copy of default journey end time

                $date = Carbon::create(Carbon::today()->toDateTimeString()) // get the Date
                    ->addDays($i)
                    ->toDateString();

                $index = 0;
                $nextIndex = 1;

                while ($index < count($stops)) {
                    // all journeys from the origin of the trip
                    $nextValue = $stops[$index];
                    $journey = factory(App\Journey::class)->create([
                        "origin" => $trip["origin"],
                        "destination" => $nextValue["name"],
                        "departure" => strtotime($startTime),
                        "arrival" => strtotime($endtime),
                        "date" => $date,
                    ]);
                    $index++;
                    $endtime->addMinutes($stopDuration); // increase the end time according to stop
                    $trip->journeys()->save($journey); // attach journey to a trip
                }

                // final journey - from the origin to the destination
                $journey = factory(App\Journey::class)->create([
                    "origin" => $trip["origin"],
                    "destination" => $trip["destination"],
                    "departure" => strtotime($startTime),
                    "arrival" => strtotime($endtime),
                    "date" => $date,
                ]);

                $trip->journeys()->save($journey);

                foreach ($stops as $value) {
                    // create all the possible journeys from the stops
                    $startTime->addMinutes($stopDuration); // increase depart time

                    $defaultEndtime->addMinutes($stopDuration); // increase arrival time
                    $endtime = Carbon::create(
                        $defaultEndtime->toDateTimeString()
                    ); // reset the endtime

                    $nextIndex = array_search($value, $stops); // find the index from which stop the journey starts from
                    $nextIndex++;

                    while ($nextIndex < count($stops)) {
                        // create all the journeys from the stop until the final destination
                        $nextValue = $stops[$nextIndex];
                        $journey = factory(App\Journey::class)->create([
                            "origin" => $value["name"],
                            "destination" => $nextValue["name"],
                            "departure" => strtotime($startTime),
                            "arrival" => strtotime($endtime),
                            "date" => $date,
                        ]);
                        $nextIndex++;
                        $endtime->addMinutes($stopDuration);
                        $trip->journeys()->save($journey);
                    }

                    // final stop -> destination
                    $journey = factory(App\Journey::class)->create([
                        "origin" => $value["name"],
                        "destination" => $trip["destination"],
                        "departure" => strtotime($startTime),
                        "arrival" => strtotime($endtime),
                        "date" => $date,
                    ]);
                    $trip->journeys()->save($journey);
                }
            }
        }
    }
}
