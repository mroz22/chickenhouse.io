import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Article = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 8px;
`;

export const Declaration = () => {
  return (
    <Wrapper>
      <h1> Declaration of chickenpendence</h1>
      <Article>We the Chicken hereby declare</Article>
      <Article>
        All chicken beings are born free and equal in dignity and rights.
      </Article>
      <Article>
        Every chicken has the right to life, liberty and security of person.
      </Article>
      <Article>No chicken shall be held in slavery or servitude.</Article>
      <Article>We are the Chicken</Article>
      <Article>We stack Sats</Article>
      <Article>We ride the lightning.</Article>
    </Wrapper>
  );
};
