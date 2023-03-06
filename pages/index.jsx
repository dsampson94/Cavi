import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Home({ contactScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          view={ 'Home' } />
    );
}
