import ShopLayout from '@/Layouts/ShopLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, products, categories, currentCategory }) {
    return (
        <ShopLayout user={auth.user}>
            <Head title="Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-coffee-900 sm:text-4xl">Our Menu</h2>
                        <p className="mt-4 text-xl text-gray-500">Freshly brewed coffee and delicious pastries.</p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Link
                            href={route('menu.index')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition ${!currentCategory ? 'bg-coffee-600 text-white' : 'bg-white text-coffee-700 hover:bg-coffee-50 border border-coffee-200'}`}
                        >
                            All
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('menu.index', { category: category.slug })}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition ${currentCategory === category.slug ? 'bg-coffee-600 text-white' : 'bg-white text-coffee-700 hover:bg-coffee-50 border border-coffee-200'}`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
