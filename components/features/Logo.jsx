import Image from 'next/image';
import React from 'react';

function Logo() {
    return <Image src={ '/cavilogo.svg' }
                  alt={ 'logo' }
                  height={ 200 }
                  width={ 150 } />;
}

export default React.memo(Logo);
