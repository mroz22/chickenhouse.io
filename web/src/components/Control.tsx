import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

export interface ControlAction {
    name: string;
    onClick: () => void;
    isDisabled: boolean;
}

interface Props {
    name: string;
    state: string;
    actions: ControlAction[]
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Name = styled.div`
    font-size: 24px;
    width: 200px;
`;

const State = styled.div`
    width: 200px;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    width: 200px;

`;

export const Control: React.FC<Props> = ({ name, state, actions }) => {
    console.log(name, state, actions)
    return (
        <Wrapper>
            <Name>{name}</Name>
            <State>{state || '???'}</State>
            <Actions>
                {actions.map(({ name, ...action }) => (
                    <Button key={name} {...action}>{name}</Button>
                ))}
            </Actions>
        </Wrapper>
    )
}