<?php

namespace App\Http\Controllers;

use App\Inventory_category;
use Illuminate\Http\Request;

class InventoryCategoryController extends Controller
{
    public function __construct(){
        $this->middleware(['auth:api']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Inventory_category::with('fields')->get();
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
        $category = Inventory_category::create([
            'title' => $request['categoryTitle'],
        ]);

        $category->fields()->createMany($request['fields']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Inventory_category  $inventory_category
     * @return \Illuminate\Http\Response
     */
    public function show(Inventory_category $inventory_category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Inventory_category  $inventory_category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = Inventory_category::findOrFail($id);

        $category->update([
         'title' => $request['categoryTitle']
        ]);

        $category->fields()->delete();
        $category->fields()->createMany($request['fields']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Inventory_category  $inventory_category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Inventory_category::findOrFail($id);

        $category->delete();
    }
}
