import { useState, useEffect } from 'react';

import db, { Kurnik } from '../db';

// todo: https://usehooks.com/useFirestoreQuery/
interface Props {
    key: string;
}

export const useDb = ({ key }: Props) => {
    console.log('---key', key);
    const dbRef = db.kurnik.doc(key)
    const [data, setData] = useState<Kurnik | undefined>();

    useEffect(() => {
        dbRef.onSnapshot(doc => {
            setData(doc.data());
        });

        return () => {
            // @ts-ignore
            // dbRef.removeAllListeners();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    console.log('data', data);
    
    return {
        dbRef,
        data,
    }
}
