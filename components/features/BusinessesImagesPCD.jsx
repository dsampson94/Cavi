import Image from 'next/image';
import React from 'react';

export default function BusinessesImagesPCD() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <div className="flex justify-center">
                        <Image src={ '/brands/Chanel-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">
                        CHANEL is an iconic name in the world of luxury.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        ‘Fashion passes, style remains’. This simple statement captures the essence of Gabrielle Chanel’s revolutionary contribution to culture. Much like
                        the elegant, iconic fashion she began designing almost a century ago, CHANEL fragrances and beauty essentials are exceptional and timeless. From
                        the legendary fragrance N°5 to the most effortlessly wearable foundations, CHANEL continues to set the standard for luxury and elegance. CHANEL
                        fragrances, cosmetics and skincare are distributed in South Africa by an independent subsidiary of CAVI Brands.
                    </p>
                </div>
                <div className="mx-auto mt-2 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-y-2 gap-x-2 lg:max-w-none lg:grid-cols-2 lg:gap-y-2">
                        <div className="flex-col">
                            <Image src={ '/chanelPict.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'w-92 h-64 br-04 rounded-xl' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                            <Image src={ '/chanelProductB.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-5 w-92 h-64 object-cover br-04 rounded-xl' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                        </div>
                        <Image src={ '/chanel6.png' }
                               alt={ 'cavi-image' }
                               className={ 'w-92 object-cover br-04 rounded-xl' }
                               height={ 600 }
                               width={ 800 }
                        />
                    </dl>
                </div>
            </div>
        </div>
    );
}
