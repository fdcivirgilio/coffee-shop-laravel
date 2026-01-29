import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, cart }) {
    const { delete: destroy, patch } = useForm();

    const removeItem = (id) => {
        destroy(route('cart.destroy', id), {
            preserveScroll: true,
        });
    };

    const updateQuantity = (id, quantity) => {
        patch(route('cart.update', id), {
            data: { quantity },
            preserveScroll: true,
        });
    };

    const subtotal = cart?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

    return (
        <ShopLayout user={auth.user}>
            <Head title="Shopping Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-coffee-900 mb-8">Shopping Cart</h1>

                    {cart?.items?.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="p-6 sm:p-8">
                                <ul className="divide-y divide-gray-200">
                                    {cart.items.map((item) => (
                                        <li key={item.id} className="py-6 flex">
                                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                <img
                                                    src={item.product.image || 'https://placehold.co/200x200?text=Coffee'}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>

                                            <div className="ml-4 flex-1 flex flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link href={route('menu.show', item.product.slug)} className="hover:text-coffee-600">
                                                                {item.product.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">${item.product.price} each</p>
                                                </div>
                                                <div className="flex-1 flex items-end justify-between text-sm">
                                                    <div className="flex items-center">
                                                        <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">Qty</label>
                                                        <select
                                                            id={`quantity-${item.id}`}
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                                                            className="rounded border-gray-300 py-1.5 focus:ring-coffee-500 focus:border-coffee-500 text-base"
                                                        >
                                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                                <option key={num} value={num}>
                                                                    {num}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="font-medium text-red-600 hover:text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <Link
                                        href={route('checkout.create')}
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link href={route('menu.index')} className="text-coffee-600 font-medium hover:text-coffee-500">
                                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-xl">
                            <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
                            <p className="mt-2 text-gray-500">Looks like you haven't added any coffee yet.</p>
                            <div className="mt-6">
                                <Link
                                    href={route('menu.index')}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700"
                                >
                                    Browse Menu
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ShopLayout>
    );
}
