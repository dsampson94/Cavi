import { BuildingStorefrontIcon, GlobeEuropeAfricaIcon, ServerIcon, TruckIcon, UserGroupIcon, WifiIcon } from '@heroicons/react/24/outline';

const features = [
    {
        id: 1,
        name: 'Distribution',
        description:

            'Through our companies, we deliver world-class distribution services to luxury beauty, fashion and accessories brands across Southern Africa.',
        icon: TruckIcon
    },
    {
        id: 2,
        name: 'Operation',
        description:
            'We operates numerous standalone branded stores, including the iconic ARC Store retail chain.',
        icon: BuildingStorefrontIcon
    },
    {
        id: 3,
        name: 'Digital Presence',
        description:
            'Leading digital capabilities in the eCommerce luxury market',
        icon: WifiIcon
    },
    {
        id: 2,
        name: 'Proud of Our Diversity',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: UserGroupIcon
    },
    {
        id: 1,
        name: 'Offices in Johannesburg and Cape Town',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: GlobeEuropeAfricaIcon
    },
    {
        name: 'CAVI Cares',
        description: 'Our vision is to help to create a better future for sustainable change in Southern Africa by changing the lives of young South Africans through education.',
        icon: ServerIcon
    }
];

export default function CenteredIconTextFeature() {
    return (
        <div className="relative bg-white py-16 sm:py-16 lg:py-16">
            <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-green-600">Proudly South African</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    CAVI Serves World-Class Luxury Brands throughout Southern Africa
                </p>
                <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                    We combine world leading brands with our extraordinary people,
                    our world class expertise, a profound understanding of our local customers, and an intimate knowledge of luxury.
                </p>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        { features.map((feature) => (
                            <div key={ feature.name } className="pt-6">
                                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                      <span className="inline-flex items-center justify-center rounded-xl bg-blue-500 p-3 shadow-lg">
                        <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                      </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                            { feature.name }
                                        </h3>
                                        <p className="mt-5 text-base leading-7 text-gray-600">{ feature.description }</p>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
}
