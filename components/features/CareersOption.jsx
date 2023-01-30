import Image from 'next/image';
import React from 'react';

const features = [
    {
        id: 1,
        name: 'Dermalogica',
        image: '/dermcareer.png',
        link: 'https://www.dermalogica.co.za/careers'
    },
    {
        id: 2,
        name: 'PCG',
        image: '/pcgcareer.png',
        link: 'https://pcg.co.za/careers/'
    },
    {
        id: 3,
        name: 'Chanel',
        image: '/chanelcareer.png',
        link: 'https://pcg.co.za/careers/'
    },
    {
        id: 4,
        name: 'PDS',
        image: '/pdscareer.png',
        link: 'https://pcg.co.za/careers/'
    }
];

export default function CareersOptions() {
    return (
        <div className="relative bg-white py-16 sm:py-16 lg:py-16">
            <div className="mx-auto max-w-md px-2 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Have you got what it takes?
                </p>
                <p className="mx-auto mt-12 text-2xl text-gray-500 p-2">
                    CAVI Brands is about people, and people make CAVI Brands. We are always looking to create relationships with the best candidates to augment and grow
                    our teams.
                    <br /><br />If you think we could gel, please visit our Careers pages below and submit your CV for consideration.
                </p>
                <div className=" mt-32">
                    <div className="grid grid-cols-1 sm: grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-4">
                        { features.map((feature) => (
                            <div key={ feature.name } className="pt-6">
                                <div className="flow-root rounded-lg bg-gray-50 px-0 pb-0">
                                    <div className="-mt-6">
                                        <div>
                            <span className="inline-flex items-center justify-center rounded-xl p-3 shadow-lg">
                                <a href={ feature.link } target="_blank">
                                <Image src={ feature.image }
                                       alt={ 'cavi-image' }
                                       className={ 'w-92 h-64 object-cover rounded-xl' }
                                       height={ 300 }
                                       width={ 350 }
                                /></a>
                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                            { feature.name }
                                        </h3>
                                        <p className="mt-5 text-base xs:text-base-12 leading-7 text-gray-600 ">{ feature.description }</p>
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
