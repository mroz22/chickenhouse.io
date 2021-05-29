import { useState, useEffect } from 'react';

import db, { Kurnik } from '../db';

export const useDb = () => {
    const ref = db.kurnik.doc('data')
    const [data, setData] = useState<Kurnik | undefined>();

    useEffect(() => {
        ref.onSnapshot(doc => {
            setData(doc.data());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ref,
        data,
    }
}
