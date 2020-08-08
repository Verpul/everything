<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory_category extends Model
{
    protected $fillable = ['title'];

    public $timestamps = false;

    public function fields()
    {
        return $this->hasMany('App\Inventory_field', 'inventory_category_id');
    }
}
