<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventory_item extends Model
{
    protected $fillable = ['title', 'fields', 'inventory_category_id'];

    public $timestamps = false;
}
