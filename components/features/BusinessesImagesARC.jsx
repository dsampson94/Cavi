import Image from 'next/image';
import React from 'react';

export default function BusinessesImageARC() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <div className="object-contain flex justify-center">
                        <Image src={ '/brands/Arc-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">
                        The beauty destination. A coveted omni-channel selection of curated global and luxury beauty brands.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        ARC was founded in 2020 with a rebellious spirit, born from the belief that the world would be a more beautiful place if we embraced uniqueness
                        and celebrated individuality.
                        ARC is more than just South Africa’s first beauty destination, it’s also a one-of-a-kind world of discovery made up of the most-loved local and
                        international brands and a wide, but carefully considered, selection of luxury products across all your self-care needs; skincare, makeup,
                        fragrance, body, men’s grooming, and of course accessories.
                        ARC Stores operates from a growing footprint of bricks and mortar stores and provides the largest focussed luxury eCommerce site in Southern
                        Africa. Omni-channel and digital optimisation are a reality, and ARC enjoys a number of D2R exclusive and important partnerships.
                    </p>
                </div>
                <div className="mx-auto mt-2 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-y-2 gap-x-2 lg:max-w-none lg:grid-cols-2 lg:gap-y-2">
                        <div className="flex-col">

                            <video className="w-92 h-64 br-04 rounded-lg" controls>
                                <source src={ '/Dermalo.mp4' } type="video/mp4" />
                            </video>
                            <Image src={ '/arcstore.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-4 w-92 h-64 object-cover br-04 rounded-lg' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                            <Image src={ '/arcs.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-3 w-92 h-64 object-cover br-04 rounded-lg' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                            <Image src={ '/arcis.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-3 w-92 h-64 object-cover br-04 rounded-lg' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                        </div>
                        <Image src={ '/bluelogowall.svg' }
                               alt={ 'cavi-image' }
                               className={ 'w-92 object-cover br-04 rounded-2xl' }
                               height={ 600 }
                               width={ 800 }
                        />
                    </dl>
                </div>
            </div>
        </div>
    );
}
