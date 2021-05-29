
import React from "react";
import styled from "styled-components";
import { getSunrise, getSunset } from "sunrise-sunset-js";
import { useParams } from 'react-router-dom';

import { Cam, Button } from "../../components";
import { PayButton } from '../../modules';
import  {useDb} from '../../hooks';
import { firebase} from '../../db';

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

    const { data, ref} = useDb();

    const moveUp = () => {
        ref.update({ door_movement: 1 });
    };

    const moveDown = () => {
        ref.update({ door_movement: -1 });
    };

    const stop = () => {
        ref.update({ door_movement: 0, door_next_state: 0 });
    };

    const toggleLight = (value) => {
        ref.update({ lightState: value });
    };

    const reboot = () => {
        ref.update({ reboot_command: true });
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
                        <h2>Light</h2>
                        <div>
                            {data && data.lightState ? "Light is on" : "Light is off"}{" "}
                        </div>
                        <Button
                            color="lightseagreen"
                            onClick={() => toggleLight(!data.lightState)}
                            isDisabled={!user}
                        >
                            Toggle light
                        </Button>
                    </Section>

                    <Section>
                        <h2>
                            Door ({data && data.door_movement === 0 && data.door_position}
                            {data && data.door_movement === 1 && "Moving up"}
                            {data && data.door_movement === -1 && "Moving down"})
                        </h2>

                        <div>sunset: {sunset.toLocaleTimeString()}</div>
                        <div>sunrise: {sunrise.toLocaleTimeString()}</div>

                        <>
                            {data && data.door_movement === 0 && (
                                <>
                                    {data.door_position !== "top" && (
                                        <Button onClick={moveUp} isDisabled={!user}>up</Button>
                                    )}
                                    {data.door_position !== "bottom" && (
                                        <Button onClick={moveDown} isDisabled={!user}>down</Button>
                                    )}
                                </>
                            )}
                            {data && data.door_movement !== 0 && (
                                <>
                                    <Button onClick={stop} isDisabled={!user}>stop</Button>
                                </>
                            )}
                        </>
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

