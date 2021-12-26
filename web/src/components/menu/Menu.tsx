import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks';

const MenuPrimary = styled.nav`
  background-color: #000;
  min-height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavLinkPrimary = styled(Link)`
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  margin-right: 12px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
`;

export const Menu = () => {
  const auth = useAuth();
  return (
    <MenuPrimary >
      <Main>

        <NavLinkPrimary to="/">Chicken citadel project</NavLinkPrimary>
        <NavLinkPrimary to="/citadels">Citadels</NavLinkPrimary>
      </Main>

      <Right>
        {
          !auth.user && <NavLinkPrimary to="/login">Login</NavLinkPrimary>
        }
        {
          auth.user && <NavLinkPrimary to="/" onClick={auth.signout}>Logout</NavLinkPrimary>
        }
      </Right>

    </MenuPrimary>
  )
}