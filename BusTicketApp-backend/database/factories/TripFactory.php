<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Stop;
use App\Trip;
use Faker\Generator as Faker;

$factory->define(Trip::class, function (Faker $faker) {
    return [
        "origin" => $faker->randomElement([
            'võru',
            'pärnu',
            'viljandi',
            "hiiumaa",
        ]),
        "destination" => $faker->randomElement([
            'narva',
            'aegviidu',
            "saaremaa",
            "paldiski",
        ]),
        // "stops" => factory(Stop::class, 2)->create(),
    ];
});
