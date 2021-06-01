import { useCallback } from 'react';

import { Control } from '../../components';

export const Reboot = ({ dbRef, user, data }) => {
    const reboot = useCallback(() => {
        dbRef.update({ reboot_command: true });
    }, [dbRef]);

    return (
        <Control name="Reboot" state={data.rebooting ? "rebooting": "running"} actions={[
            {
                name: 'Reboot',
                onClick: reboot,
                isDisabled: !user,

            }
        ]} />
    )
}