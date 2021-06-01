import { useCallback } from 'react';

import { Control } from '../../components';

export const Light = ({ data, dbRef, user }) => {

    const toggleLight = useCallback(() => {
        dbRef.update({ lightState: !data.lightState });
    }, [dbRef, data.lightState]);


    return (
        <>
            <Control
                name="Light"
                state={data.lightState ? "on" : "off"}
                actions={[
                    {
                        name: 'Switch',
                        onClick: toggleLight,
                        isDisabled: !user
                    }
                ]}
            />
        </>
    )
}