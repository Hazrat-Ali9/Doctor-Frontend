import { PropsWithChildren } from 'react';
import { Block } from 'react-login-page';

export const Logo = (props) => {
  const { keyname = 'logo', name, children, ...elmProps } = props;

  if (!children) {
    elmProps.children = '⚛️';
  }

  return (
    <Block
      {...elmProps}
      keyname={name || keyname}
      className={`login-page4-logo ${elmProps.className || ''}`}
    />
  );
};

Logo.displayName = 'Login.Logo';
