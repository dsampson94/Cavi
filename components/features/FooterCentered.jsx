import { socials } from './NavbarLeft';
import React from 'react';

const navigation = {
    main: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'People', href: '/people' },
        { name: 'Careers', href: '/careers' },
        { name: 'Businesses', href: '/businesses' },
        { name: 'Our Brands', href: '/brands' },
        { name: 'CSR', href: '/csr' }
    ]
};

export default function FooterCentered() {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                <nav className="grid grid-cols-2 md:grid-cols-3 text-center gap-4 sm:grid-cols-4 md:flex md:justify-center md:space-x-12" aria-label="Footer">
                    {navigation.main.map((item, index) => (
                        <div key={item.name} className="pb-6">
                            <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                {item.name}
                            </a>
                        </div>
                    ))}
                    <div></div> {/* Empty div for alignment */}
                </nav>
                <div className="mt-10 flex justify-center space-x-10">
                    {socials.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; {new Date().getFullYear()} CAVI Brands, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
