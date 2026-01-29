import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={route('menu.show', product.slug)}>
                <img
                    src={product.image || 'https://placehold.co/400x300?text=Coffee'}
                    alt={product.name}
                    className="w-full h-48 object-cover object-center"
                />
            </Link>
            <div className="p-4">
                <Link href={route('menu.show', product.slug)}>
                    <h3 className="text-xl font-semibold text-coffee-800 hover:text-coffee-600 truncate">{product.name}</h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-800">${product.price}</span>
                    <Link
                        href={route('menu.show', product.slug)}
                        className="px-4 py-2 bg-coffee-600 text-white text-sm font-medium rounded hover:bg-coffee-700 transition"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
