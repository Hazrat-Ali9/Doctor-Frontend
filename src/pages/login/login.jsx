import { cloneElement, forwardRef, isValidElement } from 'react';
import { Render, Provider, Container, useStore } from 'react-login-page';
import { Email } from './control/Email';
import { Password } from './control/Password';
import { Submit } from './control/Submit';
import { Reset } from './control/Reset';
import { Footer } from './control/Footer';
import { Logo } from './control/Logo';
import { Title } from './control/Title';

import './login.css';

export * from 'react-login-page';
export * from './control/Email';
export * from './control/Footer';
export * from './control/Password';
export * from './control/Submit';
export * from './control/Reset';
export * from './control/Title';
export * from './control/Logo';

const RenderLogin = () => {
  const { blocks = {}, extra = {}, data, ...label } = useStore();
  const { fields, buttons } = data || { fields: [] };
  
  return (
    <Render>
      <div className="login-page4-inner">
        <aside>{blocks.banner}</aside>
        <main>
          <header>
            {blocks.title}
            {blocks.logo}
          </header>
          {fields
            .sort((a, b) => a.index - b.index)
            .map((item, idx) => {
              const extraLabel = extra[item.name];
              if (!item.children && !extraLabel) return null;
              if (!item.children && extraLabel) return <div key={idx}>{extraLabel}</div>;
              const labelElement = label[`$${item.name}`];
              return (
                <label className={`rlp-${item.name}`} key={item.name + idx}>
                  <article>
                    {item.children}
                    {labelElement && <span className="login-page4-label">{labelElement}</span>}
                    <div className="login-page4-border"></div>
                  </article>
                  {extraLabel}
                </label>
              );
            })}
          <section>
            {buttons
              .sort((a, b) => a.index - b.index)
              .map((item, idx) => {
                const child = item.children;
                if (!isValidElement(child)) return null;
                return cloneElement(child, {
                  ...child.props,
                  key: item.name + idx,
                });
              })}
          </section>
          {blocks.footer}
        </main>
      </div>
    </Render>
  );
};

const LoginPage = forwardRef((props, ref) => {
  const { children, className, ...divProps } = props;
  return (
    <Provider>
      <Email />
      <Password />
      <Title />
      <Submit />
      <Container {...divProps} ref={ref} className={`login-page4 ${className || ''}`}>
        <RenderLogin />
      </Container>
      {children}
    </Provider>
  );
});

const Login = LoginPage;

Login.Email = Email;
Login.Password = Password;
Login.Submit = Submit;
Login.Reset = Reset;
Login.Footer = Footer;
Login.Title = Title;
Login.Logo = Logo;
Login.displayName = 'LoginPage';

export default Login;
