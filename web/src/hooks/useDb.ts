import { useState, useEffect } from 'react';

import  {db, Kurnik } from '../db';

// todo: https://usehooks.com/useFirestoreQuery/
interface Props {
    key: string;
}

export const useDb = ({ key }: Props) => {
    console.log('---key', key);
    console.log(db);
    console.log(db[key])
    const dbRef = db[key]
    const [data, setData] = useState<Kurnik | undefined>();

    useEffect(() => {
        dbRef.onSnapshot(snapshot => {
            console.log('onSnapshot triggerd', snapshot)
            console.log('doc.data()', snapshot.data());
                setData(snapshot.data());
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
