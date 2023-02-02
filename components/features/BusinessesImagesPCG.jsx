import Image from 'next/image';
import React from 'react';

export default function BusinessesImagesPCG() {
    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl mb-4 font-semibold leading-8 tracking-tight text-blue-600">PRESTIGE COSMETICS GROUP</h2>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">
                        The Prestige Cosmetics Group is the leading distributor of prestige fragrances, cosmetics and specialised skin care in South Africa.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Founded in March 1971, The Prestige Cosmetics Group (PCG) is a leading distributor of fine fragrances, cosmetics and specialised skincare in South
                        Africa. Today we operate with the philosophy of enhancing the existing capability of every stakeholder, including partnerships with global brand
                        owners, employees and suppliers, so that together we can become the best versions of ourselves. We work alongside our Brand Principals and Retail
                        Partners to deliver above market growth.
                    </p>
                </div>
                <div className="mx-auto mt-2 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-y-2 gap-x-2 lg:max-w-none lg:grid-cols-2 lg:gap-y-2">

                        <div className="flex-col">
                            <Image src={ '/bulgari.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'w-92 object-cover br-04 rounded-xl' }
                                   height={ 800 }
                                   width={ 800 }
                            />
                            <Image src={ '/rodrig.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-3 w-92  object-cover br-04 rounded-xl' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                        </div>
                        <div className="flex-col">
                            <Image src={ '/issey.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'w-92 h-72 object-cover br-04 rounded-xl' }
                                   height={ 800 }
                                   width={ 800 }
                            />
                            <Image src={ '/zadig.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'w-92 mt-4 object-cover br-04 rounded-xl' }
                                   height={ 600 }
                                   width={ 800 }
                            />
                            <Image src={ '/pcgprods.png' }
                                   alt={ 'cavi-image' }
                                   className={ 'mt-4 w-92 object-cover br-04 rounded-xl' }
                                   height={ 800 }
                                   width={ 800 }
                            />
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
