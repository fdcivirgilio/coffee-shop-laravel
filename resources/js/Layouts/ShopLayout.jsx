import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function ShopLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth, flash } = usePage().props;
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-coffee-50 flex flex-col justify-between">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-coffee-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('menu.index')} active={route().current('menu.index')}>
                                    Menu
                                </NavLink>
                                <NavLink href={route('about')} active={route().current('about')}>
                                    About
                                </NavLink>
                                <NavLink href={route('cart.index')} active={route().current('cart.index')}>
                                    Cart
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {auth.user?.is_admin && (
                                <div className="flex space-x-4 mr-4">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="text-sm font-medium text-coffee-600 hover:text-coffee-800"
                                    >
                                        Users
                                    </Link>
                                    <Link
                                        href={route('admin.products.index')}
                                        className="text-sm font-medium text-coffee-600 hover:text-coffee-800"
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        href={route('admin.orders.index')}
                                        className="text-sm font-medium text-coffee-600 hover:text-coffee-800"
                                    >
                                        Orders
                                    </Link>
                                </div>
                            )}
                            {auth.user ? (
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('orders.index')}>My Orders</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div className="space-x-4">
                                    <Link href={route('login')} className="text-gray-500 hover:text-gray-900">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="text-gray-500 hover:text-gray-900">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('menu.index')} active={route().current('menu.index')}>
                            Menu
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('about')} active={route().current('about')}>
                            About
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('cart.index')} active={route().current('cart.index')}>
                            Cart
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {auth.user ? (
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink href={route('orders.index')}>My Orders</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 space-y-1">
                                <ResponsiveNavLink href={route('login')}>Log in</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')}>Register</ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {showToast && (flash.success || flash.error) && (
                    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded shadow-lg text-white transition-opacity duration-300 ${flash.success ? 'bg-green-600' : 'bg-red-600'}`}>
                        {flash.success || flash.error}
                    </div>
                )}
                {children}
            </main>

            <footer className="bg-coffee-900 text-cream py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2024 CoffeeShop. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
