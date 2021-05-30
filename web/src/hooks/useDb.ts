import { useState, useEffect } from 'react';

import db, { Kurnik } from '../db';

export const useDb = () => {
    const dbRef = db.kurnik.doc('data')
    const [data, setData] = useState<Kurnik | undefined>();

    useEffect(() => {
        dbRef.onSnapshot(doc => {
            setData(doc.data());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        dbRef,
        data,
    }
}
