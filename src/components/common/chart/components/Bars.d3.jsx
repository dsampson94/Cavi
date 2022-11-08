import { selectAll } from 'd3';

const Bars = ({ data, height, xScale, yScale, clipPath }) => {

  selectAll('.bar').on('contextmenu ', event => event.preventDefault());

  return (
    <>
      { data.map((item, index) => (
        <rect key={ `bar-${ item?.U }-${ index }` }
              className={ 'bar' }
              clipPath={ clipPath }
              x={ xScale(new Date(item.x)) }
              y={ yScale(item.barY) - 1 }
              width={ 3 }
              height={ height - yScale(item.barY) }
              fill={ 'teal' }
        />
      )) }
    </>
  );
};

export default Bars;
