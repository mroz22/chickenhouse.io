import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const Menu = () => {
    return (


            <MenuPrimary >
                <NavLinkPrimary to="/">Chicken citadel project</NavLinkPrimary>
                <NavLinkPrimary to="/citadels">Citadels</NavLinkPrimary>
            </MenuPrimary>
            
        
    )

}