import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ItemsFooter } from './ItemsFooter';
import { ItemsMain } from './ItemsMain';
import { ItemsSortNavigation } from './ItemsSortNavigation';
import items from '../../styles/AllItems.css';
import * as actions from '../../actions';
import { listAllItems } from '../../reducers';
import { IAllStateApplication } from '../../Interface_Application';

const actionCreators = {
  addAllItems: actions.addAllItems,
  addFilterPage: listAllItems.actions.addFilterPage,
  addFilterTitle: listAllItems.actions.addFilterTitle,
  addFilterQuantity: listAllItems.actions.addFilterQuantity,
};

export const AllItems = () => {
  const [currentQuantity, setCurrentQuantity] = useState('10');
  const [currentPage, setCurrentPage] = useState('1');
  const [typeSort, setTypeSort] = useState('');
  const [titleData, setTitleData] = useState('');

  const dispatch = useDispatch();
  const {
    addAllItems,
    addFilterPage,
    addFilterTitle,
    addFilterQuantity,
  } = bindActionCreators(actionCreators, dispatch);

  const countAllItems = useSelector(
    ({ listAllItems: { countItems } }: IAllStateApplication) => countItems,
    shallowEqual,
  );
  useEffect(() => {
    addAllItems();
    addFilterTitle({ title: '' });
    addFilterPage({ page: currentPage });
    addFilterQuantity({ quantity: currentQuantity });
  }, [countAllItems]);


  const changeCurrentQuantity = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentQuantity(currentTarget.value);
    addFilterQuantity({ quantity: currentTarget.value });
  };

  const changeCurrentPage = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(currentTarget.value);
    addFilterPage({ page: currentTarget.value });
  };

  const currentSort = (type: string) => () => {
    if (type === typeSort) {
      setTypeSort(`Desc${type}`);
    } else {
      setTypeSort(type);
    }
  };

  const addSearchTitle = () => {
    addFilterTitle({ title: titleData });
  };

  const changeTitleData = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitleData(target.value);
  };

  const quantityPages: number = Math.ceil(countAllItems / Number(currentQuantity));
  const userIsLogin: string | null = localStorage.getItem('isLogin');
  return (
    <div className={items.content}>
      <div className={items.btns}>
        <div>
          <input onChange={changeTitleData} type="text" placeholder="поиск" value={titleData} />
          <button onClick={addSearchTitle} type="button" aria-label="search" />
        </div>
        <Link to={`${userIsLogin === null ? '/login' : '/addItem'}`}><button type="button" className={items.btn}>Добавить товар</button></Link>
      </div>
      <ItemsSortNavigation
        currentSort={currentSort}
        typeSort={typeSort}
      />
      <ItemsMain
        typeSort={typeSort}
        currentQuantity={currentQuantity}
      />
      <ItemsFooter
        currentPage={currentPage}
        currentQuantity={currentQuantity}
        changeCurrentQuantity={changeCurrentQuantity}
        changeCurrentPage={changeCurrentPage}
        quantityPages={quantityPages}
      />
    </div>
  );
};
