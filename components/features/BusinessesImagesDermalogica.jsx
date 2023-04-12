import Image from 'next/image';
import React from 'react';

export default function BusinessesImagesDermalogica() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <div className="object-contain flex justify-center">
                        <Image src={ '/brands/dermalogica-2.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <p className="-mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">
                        The best professional grade skin care.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Dermalogica was founded by a skin therapist, so we know how to create custom skin care solutions that work – not just today, but for life. We
                        offer professional-grade skin care education, products, and services to skin therapists and customers alike.
                    </p>
                </div>
                <div className="mx-auto mt-2 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-y-2 gap-x-2 lg:max-w-none lg:grid-cols-2 lg:gap-y-2">
                        <div className="flex-col">
                            <video className="w-92 h-64 br-04 rounded-xl" controls>
                                <source src={ '/Dermalo.mp4' } type="video/mp4" />
                            </video>
                            <Image src={ '/dermProduct2.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'w-92 h-64 object-cover br-04 rounded-xl' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                        </div>
                        <Image src={ '/dermProduct3.png' }
                               alt={ 'cavi-image' }
                               className={ 'w-92 h-164 object-cover br-04 rounded-xl' }
                               height={ 800 }
                               width={ 800 }
                        />
                    </dl>
                </div>
            </div>
        </div>
    );
}
