import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function About({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'About' } />
    );
}
