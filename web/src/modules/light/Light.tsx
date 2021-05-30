import React from 'react';

import { Button } from '../../components';

export const Light = ({ data, dbRef, user }) => {

    const toggleLight = (value) => {
        dbRef.update({ lightState: value });
    };

    return (
        <>
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
        </>
    )
}