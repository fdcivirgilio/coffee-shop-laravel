import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ auth, order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const submitStatus = (e) => {
        e.preventDefault();
        patch(route('admin.orders.update-status', order.id));
    };

    const shippingAddress = typeof order.shipping_address === 'string'
        ? JSON.parse(order.shipping_address)
        : order.shipping_address;

    return (
        <ShopLayout user={auth.user}>
            <Head title={`Order #${order.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <Link href={route('admin.orders.index')} className="text-coffee-600 hover:text-coffee-800">
                                &larr; Back to Orders
                            </Link>
                            <h1 className="text-3xl font-extrabold text-coffee-900">Order #{order.id}</h1>
                        </div>
                        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                            <form onSubmit={submitStatus} className="flex items-center space-x-2">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700">Status:</label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-coffee-500 focus:ring-coffee-500 sm:text-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <button
                                    type="submit"
                                    disabled={processing || data.status === order.status}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:opacity-50"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            {/* Order Items */}
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img className="h-10 w-10 rounded-full object-cover" src={item.product?.image || 'https://placehold.co/50x50'} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.product?.name || 'Deleted Product'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase">Total</td>
                                            <td className="px-6 py-4 text-right text-lg font-bold text-coffee-600">${order.total_amount}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Customer Details</h3>
                                </div>
                                <div className="px-4 py-5 sm:p-6 space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Name</p>
                                        <p className="text-sm font-medium text-gray-900">{order.user?.name || 'Guest'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Email</p>
                                        <p className="text-sm font-medium text-gray-900">{order.user?.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Order Date</p>
                                        <p className="text-sm font-medium text-gray-900">{new Date(order.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
                                </div>
                                <div className="px-4 py-5 sm:p-6 text-sm text-gray-900">
                                    {shippingAddress ? (
                                        <div className="space-y-1">
                                            <p>{shippingAddress.address}</p>
                                            <p>{shippingAddress.city}, {shippingAddress.zip}</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No shipping address provided.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
