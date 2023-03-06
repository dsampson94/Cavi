import Image from 'next/image';
import { Bars3Icon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftRightIcon, InboxIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ contactScrollToRef }) {

    const router = useRouter();

    const solutions = [
        {
            name: 'Inbox',
            description: 'Get a better understanding of where your traffic is coming from.',
            href: '#',
            icon: InboxIcon
        },
        {
            name: 'Messaging',
            description: 'Speak directly to your customers in a more meaningful way.',
            href: '#',
            icon: ChatBubbleBottomCenterTextIcon
        },
        {
            name: 'Live Chat',
            description: 'Your customers\' data will be safe and secure.',
            href: '#',
            icon: ChatBubbleLeftRightIcon
        },
        {
            name: 'Knowledge Base',
            description: 'Connect with third-party tools that you\'re already using.',
            href: '#',
            icon: QuestionMarkCircleIcon
        }
    ];
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'People', href: '/people' },
        { name: 'Businesses', href: '/businesses' },
        { name: 'Our Brands', href: '/brands' },
        { name: 'CSR', href: '/csr' },
        { name: 'Careers', href: '/careers' }
    ];

    return (
        <header className="sticky top-0 z-50 shadow-xl br-04 rounded-2xl">
            <Popover className="relative bg-white">
                <nav className="mx-auto flex max-w-8xl items-center justify-between pb-2 px-6 md:justify-start md:space-x-10 lg:px-8">
                    <div className="flex justify-start min-w-fit lg:w-0 lg:flex-1 mt-2 min-w-32">
                        <a href="/">
                            <Image src={ '/cavilogo.svg' }
                                   alt={ 'cavi logo' }
                                   height={ 200 }
                                   width={ 200 } />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex lg:pt-3">
                        <Popover className="relative">
                            { ({ open }) => (
                                <>
                                    {/*<Popover.Button*/ }
                                    {/*    className={classNames(*/ }
                                    {/*        open ? 'text-gray-900' : 'text-gray-500',*/ }
                                    {/*        'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'*/ }
                                    {/*    )}*/ }
                                    {/*>*/ }
                                    {/*    <span>Solutions</span>*/ }
                                    {/*    <ChevronDownIcon*/ }
                                    {/*        className={classNames(*/ }
                                    {/*            open ? 'text-gray-600' : 'text-gray-400',*/ }
                                    {/*            'ml-2 h-5 w-5 group-hover:text-gray-500'*/ }
                                    {/*        )}*/ }
                                    {/*        aria-hidden="true"*/ }
                                    {/*    />*/ }
                                    {/*</Popover.Button>*/ }

                                    <Transition
                                        as={ Fragment }
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform lg:left-1/2 lg:ml-0 lg:max-w-2xl lg:-translate-x-1/2">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <nav className="relative grid gap-6 bg-white py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                                                    { solutions.map((item) => (
                                                        <a
                                                            key={ item.name }
                                                            href={ item.href }
                                                            className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                                        >
                                                            <div
                                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white sm:h-12 sm:w-12">
                                                                <item.icon className="h-6 w-6" aria-hidden="true" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{ item.name }</p>
                                                                <p className="mt-1 text-sm text-gray-500">{ item.description }</p>
                                                            </div>
                                                        </a>
                                                    )) }
                                                </nav>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            ) }
                        </Popover>

                        { navigation.map((item) => (
                            <a key={ item.name } href={ item.href }
                               className={ `text-base font-medium text-gray-500 hover:text-gray-900 pr-4 pt-2 ${ router.pathname === item.href ? 'font-bold text-black' +
                                   '' : '' }` }
                            >
                                { item.name }
                            </a>
                        )) }

                        <div className="flex">
                            { socials.map((item) => (
                                <a key={ item.name } href={ item.href } className="text-gray-400 hover:text-gray-500 mt-2 mr-2" target="_blank">
                                    <span className="sr-only">{ item.name }</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            )) }
                            <a className="ml-8 text-sm inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-2 py-2 text-base text-white shadow-sm hover:bg-green-700"
                               onClick={ () => contactScrollToRef.current.scrollIntoView({ behavior: 'smooth' }) }>
                                Contact Us
                            </a>
                        </div>
                    </Popover.Group>
                </nav>

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
                        className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
                    >
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Image src={ '/cavilogo.svg' }
                                               alt={ 'logo' }
                                               height={ 200 }
                                               width={ 150 } />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button
                                            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid grid-cols-1 gap-7">
                                        {/*{solutions.map((item) => (*/ }
                                        {/*    <a*/ }
                                        {/*        key={item.name}*/ }
                                        {/*        href={item.href}*/ }
                                        {/*        className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"*/ }
                                        {/*    >*/ }
                                        {/*        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">*/ }
                                        {/*            <item.icon className="h-6 w-6" aria-hidden="true" />*/ }
                                        {/*        </div>*/ }
                                        {/*        <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>*/ }
                                        {/*    </a>*/ }
                                        {/*))}*/ }
                                    </nav>
                                </div>
                            </div>
                            <div className="pb-6 px-5">
                                <div className="grid grid-cols-2 gap-4">
                                    { navigation.map((item) => (
                                        <a
                                            key={ item.name }
                                            href={ item.href }
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                        >
                                            { item.name }
                                        </a>
                                    )) }
                                </div>
                                <div className="mt-6">
                                    <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                       onClick={ () => contactScrollToRef.current.scrollIntoView({ behavior: 'smooth' }) }>
                                        Contact Us
                                    </a>
                                    <div className="flex justify-center space-x-6 ">
                                        { socials.map((item) => (
                                            <a key={ item.name } href={ item.href } className=" text-gray-400 hover:text-gray-500 mt-4 ">
                                                <span className="sr-only">{ item.name }</span>
                                                <item.icon className="h-6 w-6" aria-hidden="true" />
                                            </a>
                                        )) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </header>
    );
}

export const socials = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/cavibrands/',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" { ...props }>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        )
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCnDYwOXD3h0PlrCKKH_nMKg',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" { ...props }>
                <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                />
            </svg>
        )
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/cavi-brands/?originalSubdomain=za',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 -2 24 24" { ...props }>
                <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                />
            </svg>
        )
    }
];
