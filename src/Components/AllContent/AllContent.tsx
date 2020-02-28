import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AllItems } from '../AllItems/AllItems';
import { AllProperty } from '../AllProperty/AllProperty';
import content from '../../styles/AllContent.css';

export const AllContent = () => {
  const [showPage, setShowPage] = useState('goods');
  const changeShow = (type: string) => () => {
    setShowPage(type);
  };

  const userIsLogin: string | null = localStorage.getItem('isLogin');
  const btnClassGoods = cn({
    [content.navBtn]: 'true',
    [content.active]: showPage === 'goods',
  });
  const btnClassProp = cn({
    [content.navBtn]: 'true',
    [content.active]: showPage === 'prop',
  });
  const propPage = <button onClick={changeShow('prop')} type="button" className={btnClassProp}>Листинг проперти</button>;
  const loginPage = (
    <Link to="/login">
      <button onClick={changeShow('prop')} type="button" className={btnClassProp}>Листинг проперти</button>
    </Link>
  );
  return (
    <div className={content.container}>
      <nav className={content.btns}>
        <button onClick={changeShow('goods')} type="button" className={btnClassGoods}>Листинг товаров</button>
        {userIsLogin === null ? loginPage : propPage}
      </nav>
      {showPage === 'goods' ? <AllItems /> : <AllProperty />}
    </div>
  );
};
