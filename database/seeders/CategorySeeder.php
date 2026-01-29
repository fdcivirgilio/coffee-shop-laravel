<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Hot Coffee',
                'slug' => 'hot-coffee',
                'description' => 'Classic hot coffee to warm your soul.',
                'image' => '/images/hot-coffee.jpg',
            ],
            [
                'name' => 'Cold Coffee',
                'slug' => 'cold-coffee',
                'description' => 'Refreshing iced coffee for sunny days.',
                'image' => '/images/cold-coffee.jpg',
            ],
            [
                'name' => 'Pastries',
                'slug' => 'pastries',
                'description' => 'Sweet treats to pair with your brew.',
                'image' => '/images/pastries.jpg',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
