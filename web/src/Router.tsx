import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  // useLocation, 
  // useRouteMatch,
} from "react-router-dom";
// import styled from 'styled-components';

import { Citadel, Hut, SpaceMission } from './pages/citadels';
import { Login } from './pages';
// import { Declaration } from './pages';
import { Menu, CitadelsMenu } from './components';

// const CitadelsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;


export default () => {
  // const { path } = useRouteMatch();
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/">
          {/* <Declaration /> */}
          <CitadelsMenu />
        </Route>
        <Route exact path="/citadels">
          <CitadelsMenu />
          {/* <CitadelsRouter user={user} /> */}
        </Route>
        <Route path="/citadels/:citadelId">
          <Citadels />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {/* <Route path={`${path}/:citadelId`}>
          <Citadels user={user} />
        </Route> */}
      </Switch>
    </Router>
  );
}

const Citadels = () => {
  const { citadelId } = useParams();
  switch (citadelId) {
    case 'chicken-hut':
      return <Hut />
    case 'chicken-citadel':
      return <Citadel />
    case 'chicken-space-mission':
      return <SpaceMission />
    default:
      return <>No such citadel exists yet :(</>
  }
}
