import { useEffect } from 'react';
import styled from 'styled-components';

import { initAuth } from '../hooks';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Login = () => {

    useEffect(() => {
        initAuth().appendUI();
    }, []);

    return (
        <LoginContainer id="firebaseui-auth-container" />
    )
}