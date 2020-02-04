import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import registr from '../../styles/Registration.css';
import { IStateRegistr, IUser } from './InterfaceAutorization';

export class Registration extends React.Component<{}, IStateRegistr> {
  constructor(props: {}) {
    super(props);
    this.state = {
      typePassword: 'password',
      typeReplayPassword: 'password',
      login: '',
      password: '',
      replayPassword: '',
      processRegistr: '',
    };
  }

  public changeTypeInputPassword = () => {
    const { typePassword } = this.state;
    if (typePassword === 'password') {
      this.setState({ typePassword: 'text' });
    } else {
      this.setState({ typePassword: 'password' });
    }
  };

  public changeTypeInputReplayPassword = () => {
    const { typeReplayPassword } = this.state;
    if (typeReplayPassword === 'password') {
      this.setState({ typeReplayPassword: 'text' });
    } else {
      this.setState({ typeReplayPassword: 'password' });
    }
  };

  public register = async () => {
    const { login, password, replayPassword } = this.state;
    if (login === '') {
      this.setState({ processRegistr: 'loginEmpty' });
      return;
    }
    if (password === '') {
      this.setState({ processRegistr: 'passwordEmpty' });
      return;
    }
    if (password !== replayPassword) {
      this.setState({ processRegistr: 'replayError' });
      return;
    }
    const dataResponce = await axios.get(`http://localhost:3000/users?login=${login}`);
    const user: IUser = { ...dataResponce.data[0] };

    if (user.login == undefined) {
      const newUser: IUser = { login, password };
      await axios.post('http://localhost:3000/users', newUser);
      this.setState({
        processRegistr: 'finishRegistr',
        login: '',
        password: '',
        replayPassword: '',
      });
    } else {
      this.setState({ processRegistr: 'userExist' });
    }
  };

  public changeLogin = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ login: target.value });
  };

  public changePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: target.value });
  };

  public changeReplayPassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ replayPassword: target.value });
  };

  public render() {
    const {
      typePassword,
      typeReplayPassword,
      login,
      password,
      replayPassword,
      processRegistr,
    } = this.state;
    const inputErorLogin = cn({
      [registr.inputEror]: processRegistr === 'loginEmpty' || processRegistr === 'userExist',
    });

    const inputErorPassword = cn({
      [registr.inputEror]: processRegistr === 'passwordEmpty' || processRegistr === 'replayError',
    });
    const buttonRegistr = <button onClick={this.register} className={registr.register} type="button">Зарегистрироваться</button>;
    const buttonComeBack = <Link to="/login"><button className={registr.register} type="button">Вернуться</button></Link>;
    return (
      <div className={registr.content}>
        <h1>Регистрация</h1>
        <form className={registr.form}>
          <span>Введите логин</span>
          <input onChange={this.changeLogin} className={inputErorLogin} type="text" name="login" value={login} placeholder="введите логин" />
          {processRegistr === 'userExist' && <span className={registr.registrError}>Такой логин уже занят</span>}
          {processRegistr === 'loginEmpty' && <span className={registr.registrError}>Логин не заполнен</span>}
          <span>Введите пароль</span>
          <input onChange={this.changePassword} className={inputErorPassword} type={typePassword} name="password" value={password} placeholder="введите пароль" />
          {processRegistr === 'passwordEmpty' && <span className={registr.registrError}>Пароль не заполнен</span>}
          <button className={registr.eye} onClick={this.changeTypeInputPassword} type="button" aria-label="password" />
          <span>Повторите пароль</span>
          <input onChange={this.changeReplayPassword} className={inputErorPassword} type={typeReplayPassword} name="password" value={replayPassword} placeholder="повторите пароль" />
          {processRegistr === 'replayError' && <span className={registr.registrError}>Пароли не совпадают</span>}
          {processRegistr === 'finishRegistr' && <span className={registr.registrSucces}>Пользователь зарегистрирован</span>}
          <button className={registr.eye} onClick={this.changeTypeInputReplayPassword} type="button" aria-label="password" />
          {processRegistr === 'finishRegistr' ? buttonComeBack : buttonRegistr}
        </form>
      </div>
    );
  }
}
