<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    public function trips()
    {
        return $this->belongsToMany(Trip::class);
    }
}
