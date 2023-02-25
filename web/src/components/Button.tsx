import styled from 'styled-components';

const Styled = styled.button`
  background-color: ${(props) => (props.disabled ? 'gray' : props.color)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  color: white;
  padding: 12px 18px;
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

export const Button = ({
  color = 'lightseagreen',
  isDisabled,
  children,
  ...rest
}: Props) => {
  return (
    // @ts-ignore
    <Styled type="button" disabled={isDisabled} color={color} {...rest}>
      {children}
    </Styled>
  );
};
