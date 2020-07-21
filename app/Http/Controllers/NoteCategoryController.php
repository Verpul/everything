<?php

namespace App\Http\Controllers;

use App\Note_category;
use App\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Note_category::all();
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
      Note_category::create([
        'title' => $request['categorieTitle'],
      ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note_category  $note_categorie
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $data = Note::where('note_category_id', $id)->get();

      return $data;
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
      $data = Note_category::findOrFail($id);

      $data->update([
        'title' => $request['categorieTitle']
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note_category  $note_categorie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $data = Note_category::findOrFail($id);

      $data->delete();
    }
}
