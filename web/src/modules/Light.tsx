import { useCallback } from 'react';

import { Control } from '../components';

export const Light = ({ data, dbRef, user }) => {

    const toggleLight = useCallback(() => {
        dbRef.update({ light_state: !data.light_state });
    }, [dbRef, data.light_state]);

    return (
        <Control
            name="Light"
            state={data.light_state ? "on" : "off"}
            actions={[
                {
                    name: 'Switch',
                    onClick: toggleLight,
                    isDisabled: !user
                }
            ]}
        />
    )
}
