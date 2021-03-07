<?php

use Illuminate\Database\Seeder;

class TripTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Trip::class)->create();
    }
}