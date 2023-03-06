const employeeSpotlight = [
    {
        name: 'Charl Stoltz',
        role: 'Financial Director, PCA',
        qualification: '',
        videoUrl: '/vids/Staffvid-CS.mp4',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Yvonne Moshugi',
        role: 'Front of House Coordinator',
        qualification: '',
        videoUrl: '/vids/Staffvid-Ym.mp4',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Millie De Villiers',
        role: 'e-Commerce & Digital Manager Dermalogica',
        qualification: '',
        videoUrl: '/vids/Staffvid-Mdv.mp4',
        twitterUrl: '#',
        linkedinUrl: '#'
    }
];

const people = [
    {
        name: 'Este Van Straaten',
        role: 'GROUP FINANCE EXECUTIVE',
        qualification: 'CA (SA)',
        videoUrl: '/vids/Staffvid-Evs.mp4',
        about: 'Esté is a Chartered Accountant, having completed her articles at Deloitte in Cape Town. After secondment time in the United States, Esté worked for Global Multinationals including Dell Computers, Hitachi Data Systems, Ingram Micro, Novartis and Alcon. Her experience covers the IT, Telecom and Pharmaceutical industries supporting entities in South Africa as well as across Africa. Esté is results orientated, drives simplicity, and thrives on the challenge of building people.',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Maria Lambros',
        role: 'CEO | PCG',
        qualification: 'EDP (WITS)',
        videoUrl: '/vids/Staffvid-Ml.mp4',
        about: 'Maria is a beauty and fashion retail expert. She brings more than 30 years of beauty and fashion experience to the CAVI Brands Group, 20 years of which was gained at Edcon. Maria is a results orientated marketing person, with a deep understanding of the South African retail landscape.',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Joanne Wilson',
        role: 'CEO | DERMALOGICA',
        qualification: 'BA, PGDip Mgt (GSB UCT)',
        about: 'Joanne is a seasoned retailer, with over 25 years working for Woolworths South Africa. She has strong business acumen and is passionate about building brands in the South African landscape. She is recognised as having deep knowledge of the beauty industry.',
        videoUrl: '/vids/Staffvid-Jw.mp4',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Micheal Ten Hope',
        role: 'CEO | CAVI BRANDS',
        qualification: 'B.COM, DIP ACC, CA (SA) MBA (UNIVERSITY OF CAPE TOWN)',
        videoUrl: '/vids/Staffvid-Mth.mp4',
        about: 'Michael is a successful, results-driven entrepreneur with a passion for excellence. He is the co-founder of CAVI Brands and has over 30 years’ experience in the branded beauty, fashion and accessory sectors in Southern Africa.',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Cherie Ten Hope',
        role: 'CHAIRPERSON, THE DERMAL INSTITUTE OF SOUTH AFRICA',
        qualification: 'CIDESCO, BABTAC, AAD & SAAIBTH, CERT. GEN MGMT (CRANFIELD, UK)',
        videoUrl: '/vids/Staffvid-CTH.mp4',
        about: 'Cherie has a passion for brands and is recognised for having a deep understanding of the professional skin care channel to market. She also has an instinctive understanding and knowledge of delivery-orientated marketing and sales capabilities.',
        twitterUrl: '#',
        linkedinUrl: '#'
    },
    {
        name: 'Micheal Pfaff',
        role: 'CHAIRPERSON, CAVI BRANDS GROUP',
        qualification: 'B.COM, DIP ACC, CA (SA) MBA (UNIVERSITY OF CAPE TOWN)',
        videoUrl: '/vids/Staffvid-Mp.mp4',
        about: 'Michael is a highly regarded investment banker, and is a co-founder of Candur Active Value Investments “(CAVI)”. From 2000 to 2008 he was the CEO of Rand Merchant Bank, a leading investment bank in South Africa, and he has over 30 years experience in growing both entrepreneurial and corporate businesses.',
        twitterUrl: '#',
        linkedinUrl: '#'
    }
];

export default function Team() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-24">
                <p className="text-center text-3xl p-6 mb-10 -mt-6 tracking-tight sm:text-3xl">
                    People make CAVI Brands. We invest in the growth and development of People, and
                    we are proud to be a part of this dynamic, evolving and diverse nation.
                </p>

                <div className="space-y-12 mb-8">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Spotlight on our Team Players</h2>
                    </div>
                    <ul
                        role="list"
                        className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
                    >
                        { employeeSpotlight.map((person) => (
                            <li key={ person.name }>
                                <div className="space-y-4">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <video className="br-04 rounded-xl" controls>
                                            <source src={ person.videoUrl } type="video/mp4" />
                                        </video>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="space-y-1 text-lg font-medium leading-6">
                                            <h3>{ person.name }</h3>
                                            <p className="text-indigo-600">{ person.role }</p>
                                            <p className="text-gray-400 text-m">{ person.qualification }</p>
                                            <p className="text-gray-400 mr-4 pt-4 text-m">{ person.about }</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) }
                    </ul>
                </div>

                <div className="space-y-12">
                    <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Leadership</h2>
                    </div>
                    <ul
                        role="list"
                        className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
                    >
                        { people.map((person) => (
                            <li key={ person.name }>
                                <div className="space-y-4">
                                    <div className="aspect-w-3 aspect-h-2">
                                        <video className="br-04 rounded-xl" controls>
                                            <source src={ person.videoUrl } type="video/mp4" />
                                        </video>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="space-y-1 text-lg font-medium leading-6">
                                            <h3>{ person.name }</h3>
                                            <p className="text-indigo-600">{ person.role }</p>
                                            <p className="text-gray-400 text-m">{ person.qualification }</p>
                                            <p className="text-gray-400 mr-4 pt-4 text-m">{ person.about }</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        </div>
    );
}
