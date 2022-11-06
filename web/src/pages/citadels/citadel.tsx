
import React from "react";

import { Citadel as CitadelComponent } from "../../components";
import { config } from '../../config';

interface Props {
    user?: any;
}

export const Citadel: React.FC<Props> = () => {
    return (
        // @ts-ignore
        <CitadelComponent config={config} />
    );
}

