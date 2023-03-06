import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Brands({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'Brands' } />
    );
}
