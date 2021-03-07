<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Journey;
use Faker\Generator as Faker;

$factory->define(Journey::class, function (Faker $faker) {
    return [
        "origin" => $faker->randomElement([
            'võru',
            'pärnu',
            'viljandi',
            "hiiumaa",
            'paide',
            'põltsamaa',
            'viljandi',
            'türi',
            'mäo',
            'nõo',
            'tapa',
            'aegviidu',
            'karksi-nuia',
        ]),
        "destination" => $faker->randomElement([
            'paide',
            'põltsamaa',
            'viljandi',
            'türi',
            'mäo',
            'nõo',
            'tapa',
            'aegviidu',
            'karksi-nuia',
            'narva',
            'aegviidu',
            "saaremaa",
            "paldiski",
        ]),
        "departure" => $faker->randomElement([
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
        ]),
        "arrival" => $faker->randomElement([
            "10:30",
            "11:30",
            "12:30",
            "13:30",
            "14:30",
            "15:30",
            "16:30",
            "17:30",
            "18:30",
            "19:30",
        ]),
    ];
});
