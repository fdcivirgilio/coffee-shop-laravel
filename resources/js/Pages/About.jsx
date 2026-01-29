import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';

export default function About({ auth }) {
    return (
        <ShopLayout user={auth.user}>
            <Head title="About Us" />

            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-coffee-600 tracking-wide uppercase">Our Story</h2>
                        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Brewing Passion Since 2010
                        </p>
                        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                            We believe that every cup of coffee tells a story. From the farmers who nurture the beans to the baristas who craft your drink, we are dedicated to excellence at every step.
                        </p>
                    </div>
                </div>

                <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                    <div className="absolute inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3" />
                    </div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                                Our Mission & Values
                            </h2>
                            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                                To inspire and nurture the human spirit – one person, one cup, and one neighborhood at a time.
                            </p>
                        </div>
                        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                            {[
                                {
                                    title: 'Quality',
                                    description: 'We source only the finest arabica beans and roast them with precision to unlock their full potential.',
                                    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                },
                                {
                                    title: 'Sustainability',
                                    description: 'We are committed to ethical sourcing and reducing our environmental footprint.',
                                    image: 'https://images.unsplash.com/photo-1511537632536-b7a5758c5de7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                },
                                {
                                    title: 'Community',
                                    description: 'We strive to create welcoming spaces where people can connect and share moments.',
                                    image: 'https://images.unsplash.com/photo-1525610553991-31e1603f97aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                },
                            ].map((item) => (
                                <div key={item.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-xl font-semibold text-gray-900">{item.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
