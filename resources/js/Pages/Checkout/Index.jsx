import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, cart, total }) {
    const { data, setData, post, processing, errors } = useForm({
        address: '',
        city: '',
        zip: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <ShopLayout user={auth.user}>
            <Head title="Checkout" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-coffee-900 mb-8">Checkout</h1>

                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden order-last lg:order-last mb-8 lg:mb-0">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                                <ul className="divide-y divide-gray-200">
                                    {cart.items.map((item) => (
                                        <li key={item.id} className="py-4 flex">
                                            <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                                                <img
                                                    src={item.product.image || 'https://placehold.co/100x100?text=Coffee'}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between text-sm font-medium text-gray-900">
                                                    <h3>{item.product.name}</h3>
                                                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total</p>
                                        <p>${parseFloat(total).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Form */}
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                            required
                                        />
                                        {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={data.city}
                                                onChange={e => setData('city', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                                required
                                            />
                                            {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
                                        </div>
                                        <div>
                                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                            <input
                                                type="text"
                                                id="zip"
                                                value={data.zip}
                                                onChange={e => setData('zip', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                                required
                                            />
                                            {errors.zip && <div className="text-red-500 text-xs mt-1">{errors.zip}</div>}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : `Pay $${parseFloat(total).toFixed(2)}`}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mt-2">
                                        Payment is mocked for this demo. No real charge will be made.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
