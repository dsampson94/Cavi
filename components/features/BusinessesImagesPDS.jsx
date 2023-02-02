import Image from 'next/image';
import React from 'react';

export default function BusinessesImagesPDS() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl mb-4 font-semibold leading-8 tracking-tight text-blue-600">PRESTIGE DISTRIBUTION SERVICES</h2>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">
                        With its beginnings in 1971, PDS is now a preferred distribution partner to the premium cosmetic industry.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Since 1971 we have imported and distributed premium cosmetics brands in Southern Africa. More recently, our distribution network has expanded into
                        the rest of Africa. Having identified the opportunity we are now strategically positioned as a bespoke distribution service partner with an
                        offering that is unique to the premium cosmetics industry. We have evolved from an internal distribution arm to a specialised standalone
                        distribution services company that contracts to external customers - proudly servicing Distributors, Retailers and Subsidiaries within Southern
                        Africa. This led to the creation of Prestige Distribution Services (PDS) in 2020.
                    </p>
                </div>
                <div className="mx-auto mt-2 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-y-2 gap-x-2 lg:max-w-none lg:grid-cols-3 lg:gap-y-2">
                        <Image src={ '/pdspic.png' }
                               alt={ 'cavi-image' }
                               className={ 'w-72 h-80 object-cover br-04 rounded-xl' }
                               height={ 600 }
                               width={ 800 }
                        />
                        <Image src={ '/pdspic4.png' }
                               alt={ 'cavi-image' }
                               className={ 'w-72 h-80 br-04 rounded-xl' }
                               height={ 600 }
                               width={ 800 }
                        />
                        <Image src={ '/pdspic2.png' }
                               alt={ 'cavi-image' }
                               className={ 'w-72 h-80 object-cover br-04 rounded-xl' }
                               height={ 600 }
                               width={ 800 }
                        />
                    </dl>
                </div>
            </div>
        </div>
    );
}
