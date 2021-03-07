<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    public function stops()
    {
        return $this->belongsToMany(Stop::class);
    }

    public function journeys()
    {
        return $this->hasMany(Journey::class);
    }

    public function bus()
    {
        return $this->hasOne(Bus::class);
    }
}
