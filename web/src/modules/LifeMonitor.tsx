/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState} from 'react';

import { Control } from '../components';

export const LifeMonitor = ({ data, user, dbRef }) => {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    const state = useMemo(() => {
        if (!data) {
            return 'loading...'
        }
        const { lifeMonitor } = data;

        if (lifeMonitor) {
            const diff = now - lifeMonitor;
            return `${Math.min(Math.floor(diff / 1000), 1)} seconds ago`;
        } else {
            return 'no data';
        }
    }, [now, data]);

    return (
        <Control name="Last ping" state={state} actions={[]} />
    )
}
