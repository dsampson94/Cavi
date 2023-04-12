import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import Logo from './Logo';
import { socials } from './NavbarLeft';

function NavbarCentered({ contactScrollToRef, showNavbar }) {
    const router = useRouter();

    const navigation = [
        { name: 'About', href: '/about' },
        { name: 'People', href: '/people' },
        { name: 'Businesses', href: '/businesses' },
        { name: 'Our Brands', href: '/brands' },
        { name: 'CSR', href: '/csr' },
        { name: 'Careers', href: '/careers' }
    ];

    const leftNavigation = navigation.slice(0, Math.ceil(navigation.length / 2));
    const rightNavigation = navigation.slice(Math.ceil(navigation.length / 2));

    const handleContactUsClick = async () => {
        if (router.pathname !== '/') {
            await router.push('/');
        }
        contactScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <header
                className={ `sticky top-0 z-50 shadow-xl br-04 rounded-2xl whitespace-nowrap ${
                    showNavbar ? 'opacity-100' : 'opacity-0'
                } transition-opacity` }
            >
                <Popover className="relative bg-white">
                    <nav className="max-w-8xl items-center justify-betweend px-6 md:justify-start md:space-x-10 lg:px-8">
                        <Popover.Group as="nav" className="hidden md:flex lg:pt-3 w-full">
                            <div className="w-full flex justify-center pl-2 max-h-[100px] h-[100px]">
                                <div className="flex space-x-10 pt-10 pr-10 ">
                                    { leftNavigation.map((item) => (
                                        <Link
                                            key={ item.name }
                                            href={ item.href }
                                            className={ `text-base font-medium text-gray-500 hover:text-gray-900 pr-4 pt-2 ${
                                                router.pathname === item.href ? 'font-bold text-black' : ''
                                            }` }
                                        >
                                            { item.name }
                                        </Link>
                                    )) }
                                </div>

                                <div className="min-w-fit flex items-center mb-2 hover:bg-slate-100 cursor-pointer rounded-md">
                                    <Link href="/">
                                        <Image
                                            src={ '/cavilogo.svg' }
                                            alt={ 'cavi logo' }
                                            height={ 200 }
                                            width={ 200 }
                                            layout="fixed"
                                        />
                                    </Link>
                                </div>

                                <div className="flex space-x-10 pt-10 pl-10">
                                    { rightNavigation.map((item) => (
                                        <Link
                                            key={ item.name }
                                            href={ item.href }
                                            className={ `text-base font-medium text-gray-500 hover:text-gray-900 pr-4 pt-2 ${
                                                router.pathname === item.href ? 'font-bold text-black' : ''
                                            }` }
                                        >
                                            { item.name }
                                        </Link>
                                    )) }
                                </div>
                                <Popover.Group as="nav" className="hidden space-x-10 md:flex lg:pt-3">
                                    <div className="absolute right-0 mt-4 mb-5 flex flex-row mr-8">
                                        {/*<div className="flex pr-12 justify-center space-x-6">*/ }
                                        {/*    {socials.map((item) => (*/ }
                                        {/*        <a*/ }
                                        {/*            key={item.name}*/ }
                                        {/*            href={item.href}*/ }
                                        {/*            className="text-gray-400 hover:text-gray-500 mt-4"*/ }
                                        {/*        >*/ }
                                        {/*            <span className="sr-only">{item.name}</span>*/ }
                                        {/*            <item.icon className="h-6 w-6" aria-hidden="true" />*/ }
                                        {/*        </a>*/ }
                                        {/*    ))}*/ }
                                        {/*</div>*/ }
                                        <a
                                            className="flex items-center mt-2 justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600"
                                            onClick={ handleContactUsClick }
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                </Popover.Group>

                            </div>
                        </Popover.Group>
                    </nav>
                    <div className="absolute top-0 right-0 h-0 md:hidden translate-y-2 -translate-x-3">
                        <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-white p-4 text-gray-950 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Transition
                        as={ Fragment }
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-40"
                        >
                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className=" pt-4 flex items-center justify-between">
                                    <Logo />
                                    <div className="-mr-2">
                                        <Popover.Button
                                            className="bg-white rounded-md p-2 -translate-x-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6 " aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                    { navigation.map((item) => (
                                        <Link
                                            key={ item.name }
                                            href={ item.href }
                                            className={ `block px-3 py-2 rounded-md text-base font-medium  text-gray-700 hover:text-gray-900 hover:bg-gray-50 ${ router.pathname === item.href ? 'bg-gray-100 text-gray-900' : '' }` }
                                        >
                                            { item.name }
                                        </Link>
                                    )) }
                                </div>
                                <div className="px-8 py-5 ml-10">
                                    <div className="grid grid-cols-3 gap-4">
                                        { socials.map((item) => (
                                            <a
                                                key={ item.name }
                                                href={ item.href }
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="sr-only">{ item.name }</span>
                                                <item.icon className="h-8 w-8" aria-hidden="true" />
                                            </a>
                                        )) }
                                    </div>
                                </div>
                                <a className="flex mt-1 w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                   onClick={ () => contactScrollToRef.current.scrollIntoView({ behavior: 'smooth' }) }>
                                    Contact Us
                                </a>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </header>
        </>
    );
}

export default NavbarCentered;
