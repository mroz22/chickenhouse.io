
import React from "react";

import { Citadel as CitadelComponent } from "../../components";
import { firebase } from '../../db';
import { config } from '../../config';

interface Props {
    user?: firebase.User;
}

export const Hut: React.FC<Props> = () => {
    return (
        // @ts-ignore
        <CitadelComponent config={config} />
    );
}

