<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title', 'text', 'note_category_id'];

    public $timestamps = false;
}
