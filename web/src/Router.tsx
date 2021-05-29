import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import styled from 'styled-components';

import { Citadel, Hut, SpaceMission } from './pages/citadels';
import { Declaration } from './pages';
import { Menu, CitadelsMenu } from './components';

const CitadelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export default ({ user}) => {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/">
          <Declaration />
          <CitadelsMenu />
        </Route>
        <Route path="/citadels">
          <CitadelsRouter user={user} />
        </Route>
      </Switch>
    </Router>
  );
}


const CitadelsRouter = ({user}) => {
  const location = useLocation();
  const { path } = useRouteMatch();
  return (
    <CitadelsWrapper>
      {
        location.pathname === '/citadels' && (
          <CitadelsMenu />
        )
      }
      <Switch>
        <Route exact path={path}>
          <h3>Please select a citadel.</h3>
        </Route>
        <Route path={`${path}/:citadelId`}>
          <Citadels user={user} />
        </Route>
      </Switch>
    </CitadelsWrapper>
  );
}

const Citadels = ({user}) => {
  const { citadelId } = useParams();
  switch (citadelId) {
    case 'chicken-hut':
      return <Hut user={user}/>
    case 'chicken-citadel':
      return <Citadel />
    case 'chicken-space-mission':
      return <SpaceMission />
    default:
      return <>No such citadel exists yet :(</>
  }
}