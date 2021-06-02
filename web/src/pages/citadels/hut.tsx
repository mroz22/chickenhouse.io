
import React from "react";
import styled from "styled-components";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useParams } from 'react-router-dom';

import { Cam } from "../../components";
import { PayButton, Door, Light, Reboot } from '../../modules';
import { useDb, useAuth } from '../../hooks';
import { firebase } from '../../db';
import { CAM_URL } from '../../config';

const sunset = getSunset(49.33861111, 17.99611111);
const sunrise = getSunrise(49.33861111, 17.99611111);

console.log("sunset", sunset);
console.log("sunrise", sunrise);

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

interface Props {
    user?: firebase.User;
}


// todo: move it to some configuration file
const config = {
    cams: [{
        url: CAM_URL
    }],
    modules: [
        //     {
        //     id: 'camera-1',
        //     type: 'camera',
        //     options: {
        //         url: CAM_URL,
        //     }
        // }, 
        {
            id: 'door-1',
            type: 'door',
            options: {}
        }, {
            id: 'light-1',
            type: 'light',
            options: {},
        },
        // {
        //     id: 'pay-button-1',
        //     type: 'pay-button',
        //     options: {},
        // },
        {
            id: 'reboot-1',
            type: 'reboot',
            options: {},
        }
    ]
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
        default:
            return null;
    }
}

export const Hut: React.FC<Props> = () => {

    const { data, dbRef } = useDb();
    const {user} = useAuth();

    const { citadelId } = useParams();

    if (!data) {
        return <>loading... </>
    }

    if (data.rebooting) {
        return <>Rebooting...</>;
    }

    return (
        <AppWrapper>
            <Header>
                <h1>{citadelId}</h1>
            </Header>
            <Row>
                <Col>
                    {
                        config.modules.map(c => {
                            const Component = getComponent(c.type)

                            return (
                                <Component key={c.id} user={user} dbRef={dbRef} data={data} {...c.options}></Component>
                            )
                        })
                    }
                    <Cam />

                </Col>
            </Row>

        </AppWrapper >
    );
}

