import {
    Link,
} from "react-router-dom";
import styled from 'styled-components';

import CitadelHutImg from '../../img/citadel-hut.png';
import CitadelCitadelImg from '../../img/citadel-citadel.png';


const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLinkCitadel = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
    color: #000;
`;

const MenuItem = ({ img, url, title }) => {
    return (
        <NavLinkCitadel to={url}>
            <Title>{title}</Title>
            {img && <img src={img} width="200px" height="200px" />}
        </NavLinkCitadel>
    )
}
export const CitadelsMenu = () => {
    const menuItems = [{
        title: 'Chicken hut',
        url: './citadels/chicken-hut',
        img: CitadelHutImg
    }, {
        title: 'Chicken citadel',
        url: './citadels/chicken-citadel',
        img: CitadelCitadelImg,
    }, {
        title: 'Chicken space mission',
        url: './citadels/chicken-space-mission',
        img: undefined
    }]

    return (
        <LinksWrapper>
            {menuItems.map((item) => <MenuItem key={item.url} {...item} />)}
        </LinksWrapper>
    )
}