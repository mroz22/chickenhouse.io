import React from 'react';

import { Button } from '../../components';

export const Light = ({ data, ref, user }) => {

    const toggleLight = (value) => {
        ref.update({ lightState: value });
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