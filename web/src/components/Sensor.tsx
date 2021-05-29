// @ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  width: 260px;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  background: string;
  title?: string;
}

export const Sensor = ({ data, title = 'No name' }: Props) => {
  const last = data && data[data.length - 1];

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(0);
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [last]);

  return (
    <React.Fragment>
      <h2>{title}</h2>
      {last && (
        <React.Fragment>
          <Row>
            <div>Temperature:</div>
            <div>{last.temp && `${last.temp.toFixed(1)} C`}</div>
          </Row>
          <Row>
            <div>Humidity:</div>
            <div>{last.hum && `${last.hum.toFixed(0)} %`}</div>
          </Row>
          <Row>
            <div>Last update:</div>
            <div>{counter}</div>
          </Row>
        </React.Fragment>
      )}
      {!last && 'No data'}
    </React.Fragment>
  );
};

export default Sensor;
