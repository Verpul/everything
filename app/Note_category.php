<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note_category extends Model
{
  protected $fillable = ['title'];

  public $timestamps = false;
}
