import React from 'react';
import axios from 'axios';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import logined from '../../styles/Login.css';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typePassword: 'password',
      user: {},
      login: '',
      password: '',
    };
  }


changeTypeInput = () => {
  const { typePassword } = this.state;
  if (typePassword === 'password') {
    this.setState({ typePassword: 'text' });
  } else {
    this.setState({ typePassword: 'password' });
  }
}

changeLogin = ({ target }) => {
  this.setState({ login: target.value });
  axios.get(`http://localhost:3000/users?login=${target.value}`).then(({ data }) => {
    this.setState({ user: { ...data[0] } });
  });
}

changePassword = ({ target }) => {
  this.setState({ password: target.value });
}


render() {
  const {
    login,
    password,
    user,
    typePassword,
  } = this.state;

  if (user.login === login && user.password === password) {
    localStorage.setItem('isLogin', 'true');
  } else {
    localStorage.setItem('isLogin', 'false');
  }
  const btnClass = cn({
    [logined.login]: true,
    [logined.notLogin]: localStorage.getItem('isLogin') === 'false',
  });
  return (
    <div className={logined.content}>
      <h1>Вход</h1>
      <form className={logined.form}>
        <span>логин</span>
        <input onChange={this.changeLogin} type="text" name="login" value={login} placeholder="введите логин" />
        <span>пароль</span>
        <input onChange={this.changePassword} type={typePassword} name="password" value={password} placeholder="введите пароль" />
        <button className={logined.eye} onClick={this.changeTypeInput} type="button" aria-label="password" />
        <Link to="/"><button disabled={localStorage.getItem('isLogin') === 'false'} className={btnClass} type="button">Войти</button></Link>
        <Link to="/registration">зарегистрироваться</Link>
      </form>
    </div>
  );
}
}
