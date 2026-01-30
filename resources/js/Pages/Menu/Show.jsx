import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ auth, product }) {
    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    return (
        <ShopLayout user={auth.user}>
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
                        <div
                            className="md:w-1/2 overflow-hidden cursor-zoom-in relative"
                            onMouseMove={(e) => {
                                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                const x = ((e.pageX - left) / width) * 100;
                                const y = ((e.pageY - top) / height) * 100;
                                e.currentTarget.querySelector('img').style.transformOrigin = `${x}% ${y}%`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.querySelector('img').style.transformOrigin = 'center center';
                            }}
                        >
                            <img
                                src={product.image || 'https://placehold.co/600x600?text=Coffee'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-200 ease-out transform hover:scale-150"
                            />
                        </div>
                        <div className="p-8 md:w-1/2 flex flex-col justify-center">
                            <div className="uppercase tracking-wide text-sm text-coffee-600 font-semibold">{product.category.name}</div>
                            <h1 className="mt-2 text-4xl font-extrabold text-coffee-900 leading-tight">{product.name}</h1>
                            <p className="mt-4 text-gray-600 text-lg">{product.description}</p>

                            <div className="mt-8 flex items-baseline">
                                <span className="text-3xl font-bold text-green-800">${product.price}</span>
                                <span className="ml-2 text-sm text-gray-500">USD</span>
                            </div>

                            <form onSubmit={submit} className="mt-8">
                                <div className="flex items-center space-x-4">
                                    <div className="w-24">
                                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Qty</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            value={data.quantity}
                                            onChange={e => setData('quantity', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm" // Tailwind form plugin might be missing, use custom styles if needed
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-coffee-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 transition disabled:opacity-50 mt-6"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
