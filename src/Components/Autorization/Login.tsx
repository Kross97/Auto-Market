import React, { useState } from 'react';
import axios from 'axios';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import logined from '../../styles/Login.css';

export const Login = () => {
  const [typePassword, setTypePassword] = useState('password');
  const [user, setUser] = useState({ login: '', password: '' });
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const changeTypeInput = () => {
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  };

  const changeLogin = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(target.value);
    axios.get(`http://localhost:3000/users?login=${target.value}`).then(({ data }) => {
      setUser({ ...data[0] });
    });
  };

  const changePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  if (user.login === login && user.password === password) {
    localStorage.setItem('isLogin', 'true');
  } else {
    localStorage.setItem('isLogin', 'false');
  }
  const btnClass = cn({
    [logined.login]: 'true',
    [logined.notLogin]: localStorage.getItem('isLogin') === 'false',
  });
  return (
    <div className={logined.content}>
      <h1>Вход</h1>
      <form className={logined.form}>
        <span>логин</span>
        <input onChange={changeLogin} type="text" name="login" value={login} placeholder="введите логин" />
        <span>пароль</span>
        <input onChange={changePassword} type={typePassword} name="password" value={password} placeholder="введите пароль" />
        <button className={logined.eye} onClick={changeTypeInput} type="button" aria-label="password" />
        <Link to="/"><button disabled={localStorage.getItem('isLogin') === 'false'} className={btnClass} type="button">Войти</button></Link>
        <Link to="/registration">зарегистрироваться</Link>
      </form>
    </div>
  );
};
