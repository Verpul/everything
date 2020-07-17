<?php

namespace App\Http\Controllers;

use App\Note_categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteCategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Note_categorie::all();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      Note_categorie::create([
        'title' => $request['categorieTitle'],
      ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note_categorie  $note_categorie
     * @return \Illuminate\Http\Response
     */
    public function show(Note_categorie $note_categorie)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note_categorie  $note_categorie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $data = Note_categorie::findOrFail($id);

      $data->update([
        'title' => $request['categorieTitle']
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note_categorie  $note_categorie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $data = Note_categorie::findOrFail($id);

      $data->delete();
    }
}
