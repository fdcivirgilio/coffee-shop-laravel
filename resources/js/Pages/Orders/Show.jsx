import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, order }) {
    const shipping = JSON.parse(order.shipping_address || '{}');

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Order #${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-extrabold text-coffee-900">Order #{order.id}</h1>
                        <Link href={route('orders.index')} className="text-coffee-600 hover:text-coffee-800 font-medium">
                            &larr; Back to Orders
                        </Link>
                    </div>

                    <div className="bg-white shadow-xl overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Order Details
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Placed on {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase">
                                            {order.status}
                                        </span>
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-bold">
                                        ${order.total_amount}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {shipping.address}<br />
                                        {shipping.city}, {shipping.zip}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-8">
                                <h4 className="text-base font-medium text-gray-900 mb-4">Items</h4>
                                <ul className="divide-y divide-gray-200 border-t border-gray-200">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="py-4 flex">
                                            <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                                                <img
                                                    src={item.product?.image || 'https://placehold.co/100x100?text=Coffee'}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-full h-full object-center object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex justify-between text-sm font-medium text-gray-900">
                                                    <h5>{item.product?.name || 'Unknown Product'}</h5>
                                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">Qty {item.quantity} x ${item.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
