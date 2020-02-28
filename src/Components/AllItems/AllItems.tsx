import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ItemsFooter } from './ItemsFooter';
import { ItemsMain } from './ItemsMain';
import { ItemsSortNavigation } from './ItemsSortNavigation';
import items from '../../styles/AllItems.css';
import * as actions from '../../actions';
import { listAllItems } from '../../reducers';
import { IPropsAllItems } from './InterfaceAllItems';
import { IAllStateApplication } from '../../Interface_Application';

const mapStateToProps = ({ listAllItems: { countItems } }: IAllStateApplication) => (
  { countItems }
);

const actionCreators = {
  addAllItems: actions.addAllItems,
  addAllProperties: actions.addAllProperties,
  addFilterPage: listAllItems.actions.addFilterPage,
  addFilterTitle: listAllItems.actions.addFilterTitle,
  addFilterQuantity: listAllItems.actions.addFilterQuantity,
};

const Items = (props: IPropsAllItems) => {
  const [currentQuantity, setCurrentQuantity] = useState('10');
  const [currentPage, setCurrentPage] = useState('1');
  const [typeSort, setTypeSort] = useState('');
  const [titleSearch, setTitleSearch] = useState('');
  const [titleData, setTitleData] = useState('');

  const {
    addAllItems,
    addFilterPage,
    addFilterTitle,
    addFilterQuantity,
    countItems,
  } = props;

  useEffect(() => {
    addAllItems();
    addFilterTitle({ title: '' });
    addFilterPage({ page: currentPage });
    addFilterQuantity({ quantity: currentQuantity });
  }, [countItems]);


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
    setTitleSearch(titleData);
    addFilterTitle({ title: titleData });
  };

  const changeTitleData = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitleData(target.value);
  };

  const quantityPages: number = Math.ceil(countItems / Number(currentQuantity));
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
        titleSearch={titleSearch}
        typeSort={typeSort}
        currentQuantity={currentQuantity}
        currentPage={currentPage}
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

export const AllItems = connect(mapStateToProps, actionCreators)(Items);
