<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $hotCoffee = Category::where('slug', 'hot-coffee')->first();
        $coldCoffee = Category::where('slug', 'cold-coffee')->first();
        $pastries = Category::where('slug', 'pastries')->first();

        $products = [
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Espresso',
                'slug' => 'espresso',
                'description' => 'A concentrated form of coffee served in small, strong shots.',
                'price' => 3.50,
                'stock' => 100,
                'image' => '/images/espresso.jpg',
            ],
            [
                'category_id' => $hotCoffee->id,
                'name' => 'Cappuccino',
                'slug' => 'cappuccino',
                'description' => 'Espresso-based coffee drink that originated in Italy.',
                'price' => 4.50,
                'stock' => 80,
                'image' => '/images/cappuccino.jpg',
            ],
            [
                'category_id' => $coldCoffee->id,
                'name' => 'Iced Americano',
                'slug' => 'iced-americano',
                'description' => 'Espresso shots topped with water and ice.',
                'price' => 4.00,
                'stock' => 90,
                'image' => '/images/iced-americano.jpg',
            ],
            [
                'category_id' => $pastries->id,
                'name' => 'Croissant',
                'slug' => 'croissant',
                'description' => 'Buttery, flaky, and delicious.',
                'price' => 2.50,
                'stock' => 50,
                'image' => '/images/croissant.jpg',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
