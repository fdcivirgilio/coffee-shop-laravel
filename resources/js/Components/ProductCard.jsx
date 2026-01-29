import { Link, useForm } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const { post, processing } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const addToCart = (e) => {
        e.preventDefault();
        post(route('cart.store'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <Link href={route('menu.show', product.slug)}>
                <img
                    src={product.image || 'https://placehold.co/400x300?text=Coffee'}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center"
                />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <Link href={route('menu.show', product.slug)}>
                    <h3 className="text-xl font-semibold text-coffee-800 hover:text-coffee-600 truncate">{product.name}</h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-green-800">${product.price}</span>
                    <div className="flex gap-2">
                        <Link
                            href={route('menu.show', product.slug)}
                            className="px-3 py-2 border border-coffee-600 text-coffee-600 text-sm font-medium rounded hover:bg-coffee-50 transition"
                        >
                            View
                        </Link>
                        <button
                            onClick={addToCart}
                            disabled={processing}
                            className="px-3 py-2 bg-coffee-600 text-white text-sm font-medium rounded hover:bg-coffee-700 transition disabled:opacity-50 whitespace-nowrap"
                        >
                            {processing ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
