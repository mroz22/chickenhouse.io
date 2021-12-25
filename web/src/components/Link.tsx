// @ts-nocheck

export const Link = (props) => {
  return (
    <span {...props} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
      {props.children}
    </span>
  );
};

export default Link;
