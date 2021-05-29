/* eslint-disable */
import React from 'react';

import { Button } from '../../components';

import { KurnikRef, Kurnik, firebase } from '../../db';

interface Props {
    kurnikRef: KurnikRef;
    data: Kurnik;
}

export const EggCounter: React.FC<Props> = ({ kurnikRef, data }) => {


    const add = ({ n }) => {
        kurnikRef.update({
            eggCounter: firebase.firestore.FieldValue.arrayUnion({
                n,
                ts: new Date(),
            })
        });
    }

    return (
        <div>
            <div>egg counter</div>
            {data.eggCounter.map((row) => (
                <div>
                    {row.n}
                    {/* {row.date.toJSON()} */}
                </div>
            ))}
            <Button onClick={() => add({ n: 5 })}>Add</Button>
        </div>
    )
}