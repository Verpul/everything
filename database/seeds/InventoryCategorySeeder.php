<?php

use Illuminate\Database\Seeder;

class InventoryCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Inventory_category::class, 5)->create();
    }
}
