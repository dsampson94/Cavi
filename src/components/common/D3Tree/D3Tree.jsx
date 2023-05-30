import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'Overview',
  attributes: {
    department: 'Board'
  },
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production'
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly'
          },
          children: [
            {
              name: 'Worker'
            }
          ]
        }
      ]
    }
  ]
};

export default function D3Tree() {

  const treeContainerRef = useRef();

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onResize = () => {
      if (treeContainerRef.current) {
        const { clientWidth, clientHeight } = treeContainerRef.current;
        setTranslate({
          x: clientWidth / 2.3,
          y: clientHeight / 4.5
        });
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const containerStyles = {
    width: '100%',
    height: '100vh'
  };

  const buttonStyles = {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#f8f9fa',
    color: '#333',
    cursor: 'pointer'
  };

  const buildLines = (words, lines) => {
    let line = '';
    let numberOfWordsToRemove = null;
    for (let i = 0; i < words.length; i++) {
      if (line.length < 20) {
        line = line + words[i] + ' ';
      } else {
        lines.push(line);
        numberOfWordsToRemove = i;
        words.splice(0, numberOfWordsToRemove);
        buildLines(words, lines);
        break;
      }

      if (i === words.length - 1) {
        lines.push(line);
      }
    }
  };

  const handleNodeClick = (nodeData) => {

  };

  const customRenderFunction = (node) => {
    const nodeData = node?.nodeDatum;

    let { name } = nodeData;

    let words = name?.split(' ');
    const lines = [];
    buildLines(words, lines);

    return (
      <g className="rd3t-node">
        <circle r="15" onClick={ () => {
          handleNodeClick(nodeData);
        } } />
        <g className="rd3t-label">
          { lines.map((line, index) => {
            return (
              <text key={ index } className="rd3t-label__title" x="30" y={ 20 * index }>{ line }</text>
            );
          }) }
        </g>
      </g>
    );
  };

  return (
    <div ref={ treeContainerRef } style={ containerStyles }>
      <Tree
        data={ orgChart }
        orientation="vertical"
        collapsible={ false }
        draggable={ false }
        zoomable={ false }
        depthFactor={ 150 }
        separation={ { siblings: 2.5, nonSiblings: 2.5 } }
        nodeSize={ { x: 100, y: 100 } }
        translate={ translate }
        shouldDisableNodeDrag={ true }
        renderCustomNodeElement={ customRenderFunction }
      />
    </div>
  );
}
