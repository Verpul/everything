<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory_field extends Model
{
    protected $fillable = ['title', 'type', 'inventory_category_id'];

    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo('App\Inventory_category');
    }
}
