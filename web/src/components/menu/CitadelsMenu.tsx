import { useState } from 'react';
import {
    Link,
} from "react-router-dom";
import styled from 'styled-components';

import CitadelHutImg from '../../img/citadel-hut.png';
import CitadelCitadelImg from '../../img/citadel-citadel.png';
import CitadelMarsImg from '../../img/mars.png';

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLinkCitadel = styled(Link)`
  display: flex;
  flex: ${props => props.isFocused ? '2': '1'};
  min-height: 94vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  text-decoration: none;
  transition: all .3s;
`;

const Title = styled.h3`
    color: #fff;
    font-size: 28px;
    text-align: center;
`;


const MenuItem = ({ img, url, title, isFocused, ...rest }) => {
    return (
        <NavLinkCitadel to={url} background={img} isFocused={isFocused} {...rest}>
             <Title>{title}</Title>
        </NavLinkCitadel>
    )
}

export const CitadelsMenu = () => {

    const [mouseOverCitadel, setMouseOverCitadel] = useState<string>('');

    const menuItems = [{
        title: 'Chicken hut',
        url: './citadels/chicken-hut',
        img: CitadelHutImg
    }, {
        title: 'Chicken citadel',
        url: './citadels/chicken-citadel',
        img: CitadelCitadelImg,
    }, {
        title: 'Chicken Mars terraformation mission',
        url: './citadels/chicken-space-mission',
        img: CitadelMarsImg
    }]

    return (
        <LinksWrapper>
            {menuItems.map((item) => <MenuItem key={item.url} {...item} onMouseEnter={() => setMouseOverCitadel(item.url)} isFocused={mouseOverCitadel === item.url} />)}
        </LinksWrapper>
    )
}