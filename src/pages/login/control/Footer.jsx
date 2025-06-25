import { Block } from 'react-login-page';

export const Footer = (props) => {
  const { keyname = 'footer', name, ...elmProps } = props;
  return <Block {...elmProps} keyname={name || keyname} tagName="footer" />;
};

Footer.displayName = 'Login.Footer';
