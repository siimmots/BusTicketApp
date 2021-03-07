<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bus;

use Faker\Generator as Faker;

$factory->define(Bus::class, function (Faker $faker) {
    return [
        "numberplate" => $faker->randomElement(["123ABC", "456DEF", "789GHI"]),
        "seats" => $faker->randomElement([20, 30, 40]),
    ];
});
