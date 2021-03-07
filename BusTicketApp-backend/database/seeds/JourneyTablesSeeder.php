<?php

use Illuminate\Database\Seeder;

class JourneyTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Journey::class)->create();
    }
}
