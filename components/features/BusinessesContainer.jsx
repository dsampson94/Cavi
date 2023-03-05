import Image from 'next/image';
import React from 'react';

export default function BusinessContainer() {
    return (
        <div className="">
            <div className="mx-auto max-w-7xl py-12 px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Corporate Structure
                    </h2>
                    <div className="flex justify-center py-12">
                        <Image src={ '/cavi-blue-logo.png' }
                               alt={ 'rss logo' }
                               height={ 300 }
                               width={ 300 } />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                    <div className="col-span-1 p-2 flex justify-center md:col-span-2 lg:col-span-1 border border-gray-400 rounded-lg">
                        <Image src={ '/brands/dermalogica-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <div className="col-span-1 p-2 flex justify-center md:col-span-2 lg:col-span-1 border border-gray-400 rounded-lg">
                        <Image src={ '/brands/PCG-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <div className="col-span-1 p-2 flex justify-center md:col-span-2 lg:col-span-1 border border-gray-400 rounded-lg">
                        <Image src={ '/brands/Arc-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <div className="col-span-1 p-2 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1 border border-gray-400 rounded-lg">
                        <Image src={ '/brands/PDS-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                    <div className="col-span-2 p-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1 border border-gray-400 rounded-lg">
                        <Image src={ '/brands/Chanel-1.png' }
                               alt={ 'rss logo' }
                               height={ 200 }
                               width={ 200 } />
                    </div>
                </div>
            </div>
        </div>
    );
}
