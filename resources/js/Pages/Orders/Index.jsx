import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    return (
        <ShopLayout user={auth.user}>
            <Head title="My Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-coffee-900 mb-8">My Orders</h1>

                    {orders.length > 0 ? (
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <li key={order.id}>
                                        <Link href={route('orders.show', order.id)} className="block hover:bg-gray-50">
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-coffee-600 truncate">
                                                        Order #{order.id}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {order.status}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            Total: ${order.total_amount}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <p>
                                                            Placed on {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-xl">
                            <h2 className="text-xl font-medium text-gray-900">No orders yet</h2>
                            <p className="mt-2 text-gray-500">You haven't placed any orders with us yet.</p>
                            <div className="mt-6">
                                <Link
                                    href={route('menu.index')}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ShopLayout>
    );
}
