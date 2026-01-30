<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class OrderController extends Controller
{
    private function getCart()
    {
        if (Auth::check()) {
            return Cart::where('user_id', Auth::id())->with('items.product')->first();
        }
        $sessionId = Session::getId();
        return Cart::where('session_id', $sessionId)->with('items.product')->first();
    }

    public function index()
    {
        $orders = Auth::user()->orders()->latest()->get();
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    public function create()
    {
        $cart = $this->getCart();
        
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Cart is empty');
        }

        $total = $cart->items->sum(fn($item) => $item->quantity * $item->product->price);

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
        ]);

        $cart = $this->getCart();
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->back()->with('error', 'Cart is empty');
        }

        return DB::transaction(function () use ($request, $cart) {
            $total = $cart->items->sum(fn($item) => $item->quantity * $item->product->price);

            $order = Order::create([
                'user_id' => Auth::id(), // Nullable if guest
                'total_amount' => $total,
                'status' => 'pending',
                'shipping_address' => [
                    'address' => $request->address,
                    'city' => $request->city,
                    'zip' => $request->zip,
                ],
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            // Clear cart
            $cart->items()->delete();
            $cart->delete();

            return redirect()->route('orders.show', $order);
        });
    }

    public function show(Order $order)
    {
        // Add authorization check
        if ($order->user_id && $order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');
        return Inertia::render('Orders/Show', ['order' => $order]);
    }
}
