import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Form({ auth, categories, product = null }) {
    const isEditing = !!product;

    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category_id: product?.category_id || (categories[0]?.id || ''),
        stock: product?.stock || '0',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
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
                                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                                <div className="mt-2 flex items-center space-x-6">
                                    <div className="flex-shrink-0">
                                        {data.image ? (
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                alt="Preview"
                                                className="h-24 w-24 object-cover rounded-lg border-2 border-coffee-100 shadow-sm"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-coffee-600 hover:text-coffee-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-coffee-500">
                                            <span className="inline-flex items-center px-4 py-2 border border-coffee-300 rounded-md shadow-sm text-sm font-medium text-coffee-700 bg-white hover:bg-coffee-50">
                                                Select Image from Computer
                                            </span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                onChange={e => setData('image', e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                    </div>
                                </div>
                                {errors.image && <div className="text-red-500 text-sm mt-2">{errors.image}</div>}
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
