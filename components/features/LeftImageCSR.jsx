import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';

const features = [
    {
        name: 'Push to deploy.',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: CloudArrowUpIcon
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: LockClosedIcon
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: ServerIcon
    }
];

export default function LeftImageCSR() {
    return (
        <div className="overflow-hidden bg-white pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:ml-auto lg:pt-4 lg:pl-4">
                        <div className="lg:max-w-lg -mt-8">
                            <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-500 pb-8">CAVI CARES</h2>
                            <p className="-mt-8 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Corporate Social Responsibility</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Our vision is to create a better future for South Africa by creating sustainable change in the lives of young South Africans through
                                education.<br /><br />

                                We support Blessing Day Care, a pre-school for toddlers and children. Our primary objective is aimed at improving the foundation elements
                                to get the children to a higher level of school readiness.<br /><br />

                                CAVI Brands strives to be known as an organisation with head and heart.

                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center lg:order-first">
                        <img
                            src="/cavi-cares.svg"
                            alt="cavicares"
                            className="w-72 lg:w-57 max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-full"
                            width={ 400 }
                            height={ 400 }
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-36 sm:flex-col lg:flex-row ">
                <img
                    src="/cavikids.png"
                    alt="cavicares"
                    className="h-72 rounded-xl shadow-xl"
                    width={ 550 }
                />
                <img
                    src="/cavikids1.png"
                    alt="cavicares"
                    className="h-72 rounded-xl shadow-xl sm:mt-8 lg:mt-0 lg:ml-12"
                    width={ 550 }
                    height={ 200 }

                />
            </div>


        </div>
    );
}