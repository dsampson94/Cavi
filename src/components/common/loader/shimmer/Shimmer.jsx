import React from 'react';

import './shimmer.scss';

const Shimmer = ({ showShimmer, shimmer }) => {

  if (!showShimmer) return null;

  const renderShimmer = () => {
    switch (shimmer) {
      case 'table':
        return <>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
          <div className="shimmer__comment animate"></div>
        </>;
      case 'chart':
        return <>

        </>;
    }
  };

  return (
    <div className="shimmer">
      <div className="shimmer__container">
        { renderShimmer() }
      </div>
    </div>
  );
};

Shimmer.propTypes = {};

export default Shimmer;
