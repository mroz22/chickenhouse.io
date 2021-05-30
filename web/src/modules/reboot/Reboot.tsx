import React from 'react';

import { Button } from '../../components';

export const Reboot = ({ dbRef, user }) => {
    const reboot = () => {
        dbRef.update({ reboot_command: true });
    };

    return (
        <>
            <h2>Something broken?</h2>
            <Button onClick={() => reboot()} isDisabled={!user}>Reboot</Button>
        </>
    )
}