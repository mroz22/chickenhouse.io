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
    width: 100%;
    margin: 0 30px;
`;

const Name = styled.div`
    font-size: 24px;
    display: flex;
    flex: 1
`;

const State = styled.div`
display: flex;
    flex: 1
`;

const Actions = styled.div`
    display: flex;
    flex: 2;
    flex-direction: row;
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