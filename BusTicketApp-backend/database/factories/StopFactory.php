<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Stop;
use Faker\Generator as Faker;

$factory->define(Stop::class, function (Faker $faker) {
    return [
            // "name" => $faker->randomElement([
            //     'paide',
            //     'põltsamaa',
            //     'viljandi',
            //     'türi',
            //     'mäo',
            //     'nõo',
            //     'tapa',
            //     'aegviidu',
            //     'karksi-nuia',
            // ]),
            //
            //
            // "updated_at" => null,
            // "created_at" => null,
            // "trip_id" => 1
        ];
});
