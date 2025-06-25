import { Fragment } from 'react';
import { Block } from 'react-login-page';

export const Title = (props) => {
  const { keyname = 'title', name, tagName = 'h1', ...elmProps } = props;

  if (!elmProps.children) {
    elmProps.children = (
      <Fragment>
        Admin <b>Login</b> Panel
      </Fragment>
    );
  }

  return <Block tagName={tagName} {...elmProps} keyname={name || keyname} />;
};

Title.displayName = 'Login.Title';
