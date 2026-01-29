import { Link, Head } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';

export default function Welcome({ auth }) {
    return (
        <ShopLayout user={auth.user}>
            <Head title="Welcome" />

            {/* Hero Section */}
            <div className="relative bg-coffee-800 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-coffee-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Premium Coffee</span>{' '}
                                    <span className="block text-coffee-300 xl:inline">Delivered to You</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Experience the finest artisanal coffee blends, roasted to perfection. From our roastery directly to your cup.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href={route('menu.index')}
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-coffee-900 bg-cream hover:bg-white md:py-4 md:text-lg md:px-10 transition"
                                        >
                                            View Menu
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            href={route('register')}
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-coffee-600 hover:bg-coffee-700 md:py-4 md:text-lg md:px-10 transition"
                                        >
                                            Join Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                        alt="Coffee beans"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-coffee-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A better way to drink coffee
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: 'Ethically Sourced',
                                    description: 'We partner directly with farmers to ensure fair wages and sustainable practices.',
                                },
                                {
                                    name: 'Artisan Roasted',
                                    description: 'Our master roasters carefully craft each batch to bring out unique flavor profiles.',
                                },
                                {
                                    name: 'Freshly Brewed',
                                    description: 'Served at peak freshness to ensure you get the best tasting cup every time.',
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <p className="text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Promotions / Newsletter */}
            <div className="bg-coffee-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-coffee-900 sm:text-4xl">
                        Subscribe for Coffee Updates
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 text-center mx-auto max-w-2xl">
                        Get the latest news, new blends, and exclusive offers delivered straight to your inbox.
                    </p>
                </div>
            </div>
        </ShopLayout>
    );
}
