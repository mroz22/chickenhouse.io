import React from 'react';
import { Button } from '../../components';


export const Door = ({ data, ref, user }) => {
    const moveUp = () => {
        ref.update({ door_movement: 1 });
    };

    const moveDown = () => {
        ref.update({ door_movement: -1 });
    };

    const stop = () => {
        ref.update({ door_movement: 0, door_next_state: 0 });
    };


    return (
        <>
            <h2>
                Door ({data && data.door_movement === 0 && data.door_position}
                {data && data.door_movement === 1 && "Moving up"}
                {data && data.door_movement === -1 && "Moving down"})
            </h2>

            <>
                {data && data.door_movement === 0 && (
                    <>
                        {data.door_position !== "top" && (
                            <Button onClick={moveUp} isDisabled={!user}>up</Button>
                        )}
                        {data.door_position !== "bottom" && (
                            <Button onClick={moveDown} isDisabled={!user}>down</Button>
                        )}
                    </>
                )}
                {data && data.door_movement !== 0 && (
                    <>
                        <Button onClick={stop} isDisabled={!user}>stop</Button>
                    </>
                )}
            </>
        </>
    )
}