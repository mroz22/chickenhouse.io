import { useMemo, useCallback } from 'react';

import { Control, ControlAction } from '../../components';

export const Door = ({ data, dbRef, user }) => {
    const moveUp = useCallback(() => {
        dbRef.update({ door_movement: 1 });
    }, [dbRef]);

    const moveDown = useCallback(() => {
        dbRef.update({ door_movement: -1 });
    }, [dbRef]);

    const stop = useCallback(() => {
        dbRef.update({ door_movement: 0 });
    }, [dbRef]);

    const state = useMemo(() => {
        if (!data) {
            return
        }
        const { door_movement, door_position } = data;
        if (door_movement === 0) {
            return door_position
        } else if (door_movement === 1) {
            return "Moving up"
        } else if (door_movement === -1) {
            return "Moving down"
        }
    }, [data])

    const actions: ControlAction[] = useMemo(() => {
        if (!data) {
            return []
        }

        const { door_movement, door_position } = data;

        const actions = [{
            name: 'up',
            onClick: moveUp,
            isDisabled: !user || door_movement !== 0 || door_position === 'top',
        }, {
            name: 'stop',
            onClick: stop,
            isDisabled: !user || door_movement === 0,
        }, {
            name: 'down',
            onClick: moveDown,
            isDisabled: !user || door_movement !== 0 || door_position === 'bottom',
        }];
        return actions;
    }, [data, user, moveDown, moveUp, stop]);

    console.log(actions);

    return (
        <Control name="Door" state={state} actions={actions} />
    )
}