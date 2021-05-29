import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { initAuth, firebase } from '../db';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.div`
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
`;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Auth: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | undefined>(undefined);
  useEffect(() => {
    initAuth();

    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  const [loginActive, setIsLoginActive] = useState(false);
  console.log('user', user);
  return (
    <Wrapper>
      {!user && (
        <LoginButton onClick={() => setIsLoginActive(!loginActive)}>
          {loginActive ? 'Back' : 'Login'}
        </LoginButton>
      )}
      {user && (
        <LoginButton onClick={() => firebase.auth().signOut()}>
          Logout
        </LoginButton>
      )}
      <LoginContainer
        id="firebaseui-auth-container"
        style={{
          height: loginActive ? '100vh' : '0px',
          visibility: loginActive ? 'visible' : 'hidden',
        }}
      />
      {!loginActive &&
        React.isValidElement(children) &&
        React.cloneElement(children, { user })}
    </Wrapper>
  );
};
