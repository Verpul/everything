<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Inventory_category;
use Faker\Generator as Faker;

$factory->define(Inventory_category::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
    ];
});
