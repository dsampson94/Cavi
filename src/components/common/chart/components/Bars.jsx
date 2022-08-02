const Bars = ({ data, height, xScale, yScale, clipPath }) => {
  return (
    <>
      { data.map((item, index) => (
        <rect
          key={ `bar-${ item?.U }-${ index }` }
          clipPath={ clipPath }
          x={ xScale(new Date(item.x)) }
          y={ yScale(item.barY) }
          width={ 3 }
          height={ height - yScale(item.barY) }
          fill="teal"
        />
      )) }
    </>
  );
};

export default Bars;
