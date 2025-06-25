import { Button } from 'react-login-page';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const Submit = (props) => {
  const { keyname = 'submit', ...elmProps } = props;
  const { setEmail, setPassword, email, password } = useContext(AppContext);
  const navigate = useNavigate();
  const {API} = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailInput = elmProps.name === 'email' ? elmProps.value : '';
    const passwordInput = elmProps.name === 'password' ? elmProps.value : '';
    
    setEmail(emailInput);
    setPassword(passwordInput);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        Cookies.set('authToken', response.data.token, { expires: 7 });

        // Wait momentarily to ensure the cookie is set
        setTimeout(() => {
          toast.success('Login Successful!');
          navigate('/admin');
        }, 1000);
      } else {
        toast.error('Login failed: ' + response.data.message);
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  if (!elmProps.children) {
    elmProps.children = <div>Log in</div>;
  } else {
    elmProps.children = <div>{elmProps.children}</div>;
  }

  return <Button type="submit" {...elmProps} keyname={keyname} onClick={handleSubmit} />;
};

Submit.displayName = 'Login.Submit';
