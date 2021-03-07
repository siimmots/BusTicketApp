<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJourneysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journeys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("trip_id")->nullable();
            $table->string("origin");
            $table->string("destination");
            $table->string("departure");
            $table->string("arrival");
            $table->string("date");
            $table->timestamps();

            $table
                ->foreign("trip_id")
                ->references("id")
                ->on("trips")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('journeys');
    }
}
