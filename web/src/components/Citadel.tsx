
import React from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import { PayButton, Door, Light, Reboot } from '../modules';
import { useDb, useAuth } from '../hooks';
import { firebase } from '../db';

import { Cam } from "./Cam";

const AppWrapper = styled.div`
  color: white;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #3b3d4b;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  background-color: #3b3d4b;
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
    user?: firebase.User;
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
            return Cam;
        default:
            return null;
    }
}

export const Citadel: React.FC<Props> = ({ config }) => {
    const { citadelId } = useParams();
console.log('citadelId', citadelId);
    const { data, dbRef } = useDb({key: citadelId});
    const { user } = useAuth();

    const citadelConfig = config[citadelId];

    if (!data) {
        return <>loading... </>
    }

    if (data.rebooting) {
        return <>Rebooting...</>;
    }

    return (
        <AppWrapper>
            <Header>
                <h1>{citadelConfig.name}</h1>
            </Header>
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

        </AppWrapper >
    );
}

