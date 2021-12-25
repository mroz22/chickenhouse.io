import { useState } from 'react';
import {
    Link,
} from "react-router-dom";
import styled, { css } from 'styled-components';

import CitadelHutImg from '../../img/citadel-hut.png';
import CitadelCitadelImg from '../../img/citadel-citadel.png';
import CitadelMarsImg from '../../img/mars.png';

const breakpoint = '768px'
const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  background-color: #000;

  @media (max-width: ${breakpoint}) {
    flex-direction: column;
  }
`;

const NavLinkCitadel = styled(Link)`
  display: flex;
  flex: ${props => props.isFocused ? '2' : '1'};
  min-height: 94vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  text-decoration: none;
  transition: all .3s;

  ${props => props.isFocused && css`
    transform: scale(0.98)
  `};  

  @media(max-width: ${breakpoint}) {
    min-height: 31.33vh;
    width: 100vw;
  }
`;

const Title = styled.h3`
    color: #fff;
    font-size: 28px;
    text-align: center;
    padding: 0 20px;    
`;

const SubTitle = styled(Title)`
   font-size: 16px;
`

// const Desc = styled.div<{ isFocused: boolean }>`
//     height: 200px;
//     width: 200px;
//     background-color: white;
//     opacity: ${props => props.isFocused ? '1' : '0'};
// `;

const MenuItem = ({ img, url, title, subtitle, isFocused, ...rest }) => {
    return (
        <NavLinkCitadel to={url} background={img} isFocused={isFocused} {...rest}>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
            {/* <Desc isFocused={isFocused}>
                Meow     memw o wom oew mofmwfiow mfwiof m
            </Desc> */}
        </NavLinkCitadel>
    )
}

export const CitadelsMenu = ({ isSmall = true }) => {

    const [mouseOverCitadel, setMouseOverCitadel] = useState<string>('');

    const menuItems = [{
        title: 'Chicken hut',
        subtitle: 'Where it all begun...',
        url: './citadels/chicken-hut',
        img: CitadelHutImg
    }, {
        title: 'Chicken citadel',
        subtitle: 'We are the Chicken. We stack Sats. We ride the lightning',
        url: './citadels/chicken-citadel',
        img: CitadelCitadelImg,
    }, {
        title: 'Chicken Mars terraformation mission',
        subtitle: 'Lets make Chicken specie interplanetary',
        url: './citadels/chicken-space-mission',
        img: CitadelMarsImg
    }]

    return (
        <LinksWrapper>
            {menuItems.map((item) => <MenuItem key={item.url} {...item} isSmall={isSmall} onMouseEnter={() => setMouseOverCitadel(item.url)} isFocused={mouseOverCitadel === item.url} />)}
        </LinksWrapper>
    )
}
