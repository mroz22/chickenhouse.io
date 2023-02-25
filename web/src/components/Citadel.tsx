
import React from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import { PayButton, Door, Light, Reboot, Camera } from '../modules';
import { useDb, useAuth } from '../hooks';

import CitadelHutImg from '../img/citadel-hut.png';
import CitadelCitadelImg from '../img/citadel-citadel.png';
import CitadelMarsImg from '../img/mars.png';
import { LifeMonitor } from "../modules/LifeMonitor";

const AppWrapper = styled.div`
  color: white;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  background-color: #3b3d4b;

  flex-direction: row;
  flex: 1;
  min-height: 94vh;

  @media (max-width: 768px) {
      flex-direction: column;
  }
`;

const Header = styled.header<{ background: any }>`
  width: 100%;
  text-align: center;
  background-color: #3b3d4b;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  text-decoration: none;

  height: 94vh;
  width: 33vw;

  @media (max-width: 768px) {
    height: 33vh;
    width: 100vw;
  }
`;

const Content = styled.div`
  overflow-y: auto;
  display: flex:
  flex:1;
  width: 100%;
  height: 100%;
  padding: 24px 12px;

`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Config {
    name: string;
    modules: {
        id: string;
        type: string;
        // type: 'door' | 'light' | 'reboot' | 'pay-button' | 'camera',
        options: any;
    }[];
}

interface Props {
    user?: any;
    config: {
        [key: string]: Config;
    }

}

const getComponent = (type: string) => {
    switch (type) {
        case 'door':
            return Door;
        case 'light':
            return Light;
        case 'pay-button':
            return PayButton;
        case 'reboot':
            return Reboot;
        case 'camera':
            return Camera;
        case 'life-monitor':
            return LifeMonitor;
        default:
            return null;
    }
}

export const Citadel: React.FC<Props> = ({ config }) => {
    const { citadelId } = useParams();
    console.log('citadelId', citadelId);
    console.log('config', config);
    const { data, dbRef } = useDb({ key: citadelId });
    const { user } = useAuth();

    const citadelConfig = config[citadelId];

    let CitadelBackground
    switch (citadelId) {
        case 'chicken-hut':
            CitadelBackground = CitadelHutImg;
            break;
        case 'chicken-citadel':
            CitadelBackground = CitadelCitadelImg;
            break;
        default:
            CitadelBackground = CitadelMarsImg;
            break;
    }

    return (
        <AppWrapper>
            <Header background={CitadelBackground}>
                <h1>{citadelConfig.name}</h1>

            </Header>
            <Content>
                {data && !data.rebooting && (
                    <Row>
                        <Col>
                            {
                                citadelConfig.modules.map(c => {
                                    const Component = getComponent(c.type)
                                    return (
                                        <Component key={c.id} user={user} dbRef={dbRef} data={data} options={c.options['web']}></Component>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                )}
            </Content>
        </AppWrapper >
    );
}

