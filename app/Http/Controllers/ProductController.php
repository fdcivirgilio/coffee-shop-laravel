<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category');
        
        $products = Product::query()
            ->when($categoryId, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->where('is_active', true)
            ->with('category')
            ->get();

        $categories = Category::all();

        return Inertia::render('Menu/Index', [
            'products' => $products,
            'categories' => $categories,
            'currentCategory' => $categoryId,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category');
        
        return Inertia::render('Menu/Show', [
            'product' => $product,
        ]);
    }
}
