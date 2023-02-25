
import React from "react";

import { Citadel as CitadelComponent } from "../../components";
import { config } from '../../config';

interface Props {
    user?: any;
}

export const SpaceMission: React.FC<Props> = () => {
    return (
        <CitadelComponent config={config} />
    );
}

