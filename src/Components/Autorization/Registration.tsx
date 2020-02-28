import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import registr from '../../styles/Registration.css';
import { IUser } from './InterfaceAutorization';

export const Registration = () => {
  const [typePassword, setTypePassword] = useState('password');
  const [typeReplayPassword, setTypeReplayPassword] = useState('password');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [replayPassword, setReplayPassword] = useState('');
  const [processRegistr, setProcessRegistr] = useState('');

  const changeTypeInputPassword = () => {
    if (typePassword === 'password') {
      setTypePassword('text');
    } else {
      setTypePassword('password');
    }
  };

  const changeTypeInputReplayPassword = () => {
    if (typeReplayPassword === 'password') {
      setTypeReplayPassword('text');
    } else {
      setTypeReplayPassword('password');
    }
  };

  const register = async () => {
    if (login === '') {
      setProcessRegistr('loginEmpty');
      return;
    }
    if (password === '') {
      setProcessRegistr('passwordEmpty');
      return;
    }
    if (password !== replayPassword) {
      setProcessRegistr('replayError');
      return;
    }
    const dataResponce = await axios.get(`http://localhost:3000/users?login=${login}`);
    const user: IUser = { ...dataResponce.data[0] };

    if (user.login == undefined) {
      const newUser: IUser = { login, password };
      await axios.post('http://localhost:3000/users', newUser);
      setProcessRegistr('finishRegistr');
      setLogin('');
      setPassword('');
      setReplayPassword('');
    } else {
      setProcessRegistr('userExist');
    }
  };

  const changeLogin = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(target.value);
  };

  const changePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };

  const changeReplayPassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setReplayPassword(target.value);
  };

  const inputErorLogin = cn({
    [registr.inputEror]: processRegistr === 'loginEmpty' || processRegistr === 'userExist',
  });

  const inputErorPassword = cn({
    [registr.inputEror]: processRegistr === 'passwordEmpty' || processRegistr === 'replayError',
  });
  const buttonRegistr = <button onClick={register} className={registr.register} type="button">Зарегистрироваться</button>;
  const buttonComeBack = <Link to="/login"><button className={registr.register} type="button">Вернуться</button></Link>;
  return (
    <div className={registr.content}>
      <h1>Регистрация</h1>
      <form className={registr.form}>
        <span>Введите логин</span>
        <input onChange={changeLogin} className={inputErorLogin} type="text" name="login" value={login} placeholder="введите логин" />
        {processRegistr === 'userExist' && <span className={registr.registrError}>Такой логин уже занят</span>}
        {processRegistr === 'loginEmpty' && <span className={registr.registrError}>Логин не заполнен</span>}
        <span>Введите пароль</span>
        <input onChange={changePassword} className={inputErorPassword} type={typePassword} name="password" value={password} placeholder="введите пароль" />
        {processRegistr === 'passwordEmpty' && <span className={registr.registrError}>Пароль не заполнен</span>}
        <button className={registr.eye} onClick={changeTypeInputPassword} type="button" aria-label="password" />
        <span>Повторите пароль</span>
        <input onChange={changeReplayPassword} className={inputErorPassword} type={typeReplayPassword} name="password" value={replayPassword} placeholder="повторите пароль" />
        {processRegistr === 'replayError' && <span className={registr.registrError}>Пароли не совпадают</span>}
        {processRegistr === 'finishRegistr' && <span className={registr.registrSucces}>Пользователь зарегистрирован</span>}
        <button className={registr.eye} onClick={changeTypeInputReplayPassword} type="button" aria-label="password" />
        {processRegistr === 'finishRegistr' ? buttonComeBack : buttonRegistr}
      </form>
    </div>
  );
};
