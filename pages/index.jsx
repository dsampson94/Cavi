import React from 'react';

import ContentContainer from '../components/content-container/ContentContainer';

export default function Home({ contactScrollToRef, businessScrollToRef, brandsScrollToRef, peopleScrollToRef }) {
    return (
        <ContentContainer contactScrollToRef={ contactScrollToRef }
                          businessScrollToRef={ businessScrollToRef }
                          brandsScrollToRef={ brandsScrollToRef }
                          peopleScrollToRef={ peopleScrollToRef }
                          view={ 'Home' } />
    );
}
