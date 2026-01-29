<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Virgilio Aguirre',
            'email' => 'aguirrevirgilio17@gmail.com',
            'password' => bcrypt('password'), // Or any default password, user can reset
            'is_admin' => true,
        ]);
    }
}
