// @ts-nocheck

import styled from 'styled-components';

const Styled = styled.button`
  background-color: ${(props) => (props.disabled ? 'gray' : props.color)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  display: flex;
  margin: 5px 5px;
  font-weight: bolder;
`;

interface Props extends React.HTMLProps<HTMLButtonElement> {
  isDisabled?: boolean;
  color?: string;
}

export const Button: React.FC<Props> = ({
  color = 'lightseagreen',
  isDisabled,
  ...props
}) => {
  return (
    <Styled type="button" {...props} disabled={isDisabled} color={color}>
      {props.children}
    </Styled>
  );
};
