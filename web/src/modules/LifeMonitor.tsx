/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';

import { Control } from '../components';

export const LifeMonitor = ({ data, user, dbRef }) => {
    const state = useMemo(() => {
        if (!data) {
            return
        }
        const { lifeMonitor } = data;
        return lifeMonitor;
    }, [data])


    return (
        <Control name="Last ping" state={state} actions={[]} />
    )
}
