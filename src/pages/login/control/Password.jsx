import { memo } from 'react';
import { Input, useStore } from 'react-login-page';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

export const Password = memo((props) => {
  const { keyname = 'password', name, rename, label = 'Password:', ...elmProps } = props;
  const { dispatch, password, setPassword } = useContext(AppContext); // Get password and setPassword from context

  const key = keyname || name;

  return (
    <Input
      type="password"
      placeholder="Password"
      autoComplete="on"
      index={2}
      {...elmProps}
      name={name || rename || keyname}
      keyname={key}
      value={password} // Control the input value
      onChange={(e) => setPassword(e.target.value)} // Update context on change
    />
  );
});

Password.displayName = 'Login.Password';
