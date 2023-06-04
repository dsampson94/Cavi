import React from 'react';
import { SVGIcon } from './SVGIcon';

export default function LogoCloud() {
    const names = [
        'Amouage', 'Bulgari', 'Chanel', 'Chopard', 'Clear', 'Coach', 'Dermalogica',
        'Dolce', 'Elemis', 'Elie', 'Ellis', 'Floral', 'Guerlain',
        'Hermes', 'Issey', 'Jorgobe', 'Jack', 'Prairie', 'Memo', 'Narciso',
        'Van', 'Nesti', 'Phillip', 'Sensai', 'Tommy', 'Zadig'
    ];

    const rows = [
        names.slice(0, 7),
        names.slice(7, 13),
        names.slice(13, 20),
        names.slice(20, 26)
    ];

    return (
        <div className="flex flex-col mx-auto pt-12 pr-6 md:pr-10 pb-12 -mt-16 md:pt-8">
            { rows.map((row, i) => (
                <div key={ i } className={ `flex justify-center ${ row.length === 7 ? 'w-full' : 'w-11/12 mx-auto' }` }>
                    { row.map((name, j) => (
                        <div key={ j } className={ 'w-72' }>
                            <SVGIcon name={ name } />
                        </div>
                    )) }
                </div>
            )) }
        </div>
    );
}
