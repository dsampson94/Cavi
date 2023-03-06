import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Careers({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'Careers' } />
    );
}
