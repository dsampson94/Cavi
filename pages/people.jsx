import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function People({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'People' } />
    );
}
