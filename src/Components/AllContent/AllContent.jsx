import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AllItems } from '../AllItems/AllItems';
import { AllProperty } from '../AllProperty/AllProperty';
import content from '../../styles/AllContent.css';

export class AllContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPage: 'goods' };
  }

  changeShow = (type) => () => {
    this.setState({ showPage: type });
  }

  render() {
    const userIsLogin = localStorage.getItem('isLogin');
    const { showPage } = this.state;
    const btnClassGoods = cn({
      [content.navBtn]: true,
      [content.active]: showPage === 'goods',
    });
    const btnClassProp = cn({
      [content.navBtn]: true,
      [content.active]: showPage === 'prop',
    });
    const propPage = <button onClick={this.changeShow('prop')} type="button" className={btnClassProp}>Листинг проперти</button>;
    const loginPage = (
      <Link to="/login">
        <button onClick={this.changeShow('prop')} type="button" className={btnClassProp}>Листинг проперти</button>
      </Link>
    );
    return (
      <div className={content.container}>
        <nav className={content.btns}>
          <button onClick={this.changeShow('goods')} type="button" className={btnClassGoods}>Листинг товаров</button>
          {userIsLogin === null ? loginPage : propPage}
        </nav>
        {showPage === 'goods' ? <AllItems /> : <AllProperty />}
      </div>
    );
  }
}
