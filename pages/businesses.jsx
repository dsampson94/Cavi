import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Businesses({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'Businesses' } />
    );
}
