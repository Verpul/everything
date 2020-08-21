<?php

namespace App\Http\Controllers;

use App\Inventory_item;
use Illuminate\Http\Request;

class InventoryItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Inventory_item::create([
            'title' => $request['title'],
            'fields' => json_encode($request['fields']),
            'inventory_category_id' => $request['categoryId']
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Inventory_items  $inventory_items
     * @return \Illuminate\Http\Response
     */
    public function show(Inventory_items $inventory_items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Inventory_items  $inventory_items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Inventory_item::findOrFail($id);

        $item->update([
            'title' => $request['title'],
            'fields' => json_encode($request['fields']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Inventory_items  $inventory_items
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Inventory_item::findOrFail($id);

        $item->delete();
    }
}
