import { memo } from 'react';
import { Input, useStore } from 'react-login-page';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

export const Email = memo((props) => {
  const { keyname = 'email', name, rename, label = 'Email:', ...elmProps } = props;
  const { dispatch, email, setEmail } = useContext(AppContext); // Get email and setEmail from context

  const key = keyname || name;

  return (
    <Input
      type="email"
      placeholder="Email"
      spellCheck={false}
      index={1}
      {...elmProps}
      name={name || rename || keyname}
      keyname={key}
      value={email} // Control the input value
      onChange={(e) => setEmail(e.target.value)} // Update context on change
    />
  );
});

Email.displayName = 'Login.Email';
