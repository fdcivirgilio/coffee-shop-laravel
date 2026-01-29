import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Form({ auth, categories, product = null }) {
    const isEditing = !!product;

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category_id: product?.category_id || (categories[0]?.id || ''),
        stock: product?.stock || '0',
        image_url: product?.image || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.products.update', product.id));
        } else {
            post(route('admin.products.store'));
        }
    };

    return (
        <ShopLayout user={auth.user}>
            <Head title={isEditing ? "Edit Product" : "Create Product"} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href={route('admin.products.index')} className="text-coffee-600 hover:text-coffee-800">
                            &larr; Back to Products
                        </Link>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEditing ? "Edit Product" : "Create New Product"}</h1>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <div className="text-red-500 text-xs mt-1">{errors.category_id}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                        required
                                    />
                                    {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                        required
                                    />
                                    {errors.stock && <div className="text-red-500 text-xs mt-1">{errors.stock}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    value={data.image_url}
                                    placeholder="https://example.com/image.jpg"
                                    onChange={e => setData('image_url', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-coffee-500 focus:border-coffee-500 sm:text-sm"
                                />
                                {errors.image_url && <div className="text-red-500 text-xs mt-1">{errors.image_url}</div>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-coffee-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 disabled:opacity-50"
                                >
                                    {isEditing ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
