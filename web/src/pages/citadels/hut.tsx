
import React from "react";
import styled from "styled-components";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useParams } from 'react-router-dom';

import { Cam, Button } from "../../components";
import { PayButton, Door, Light } from '../../modules';
import { useDb } from '../../hooks';
import { firebase } from '../../db';

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

const CamCol = styled(Col)``;

const Section = styled.div`
  width: 250px;
  padding: 20px 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;


interface Props {
    user?: firebase.User;
}


export const Hut: React.FC<Props> = ({ user }) => {

    const { data, dbRef } = useDb();

    const reboot = () => {
        dbRef.update({ reboot_command: true });
    };


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
            </Row>
            <Row>
                <Col>
                    <Section>
                        <Light data={data} dbRef={dbRef} user={user} />
                    </Section>

                    <Section>

                        <div>sunset: {sunset.toLocaleTimeString()}</div>
                        <div>sunrise: {sunrise.toLocaleTimeString()}</div>

                        <Door data={data} dbRef={dbRef} user={user} />
                    </Section>

                    <Section>
                        <h2>Something broken?</h2>
                        <Button onClick={() => reboot()} isDisabled={!user}>Reboot</Button>
                    </Section>
                    <Section>
                        <PayButton />
                    </Section>
                </Col>

                <CamCol><Cam /></CamCol>
            </Row>

        </AppWrapper >
    );
}

