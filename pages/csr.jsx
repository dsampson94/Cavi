import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Csr({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'Csr' } />
    );
}
