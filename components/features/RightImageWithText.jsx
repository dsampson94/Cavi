export default function RightImageWithText() {

    return (
        <div className="relative bg-white">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 p-7 mt-12">
                <img
                    className="aspect-[16/9] object-cover rounded-xl shadow-xl"
                    src="/fourps.jpg"
                    alt=""
                />
            </div>
            <div className="mx-auto max-w-7xl">
                <div className="relative z-10 lg:w-full lg:max-w-2xl">
                    <div className="relative py-12 px-6 sm:py-40 lg:py-56 lg:px-8 lg:pr-0">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:-mt-36">
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 ">
                                OUR VISION
                            </h1>
                            <p className="my-4 text-lg leading-8 text-gray-600">
                                CAVI Brands will be the most inspirational luxury branded beauty, fashion and accessory business in Southern Africa.
                            </p>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                INVESTMENT PHILOSOPHY
                            </h1>
                            <p className="my-4 text-lg leading-8 text-gray-600">
                                We have a long term view regarding growth and partnerships.
                            </p>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                OUR VALUES
                            </h1>
                            <p className="my-4 text-lg leading-8 text-gray-600">
                                Culture and integrity are emphasised and we strive to deliver a dynamic and professional outcome.
                            </p>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">
                                THE DIGITAL WORLD OF LUXURY RETAIL
                            </h1>
                            <p className="my-4 text-lg leading-8 text-gray-600">
                                Understanding and serving the consumer is our objective and delivering an integrated omni-channel experience is essential in our markets.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a href="/brands" className="text-base font-semibold leading-7 text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
