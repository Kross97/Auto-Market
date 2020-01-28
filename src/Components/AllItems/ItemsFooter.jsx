import React from 'react';
import cn from 'classnames';
import items from '../../styles/AllItems.css';

export const ItemsFooter = (props) => {
  const constructorPages = (allPages, quantityPages, valuePage) => {
    if (quantityPages === 0) {
      return allPages;
    }
    const newAllPages = [...allPages, `${valuePage}`];
    return constructorPages(newAllPages, quantityPages - 1, valuePage + 1);
  };

  const {
    currentQuantity,
    currentPage,
    changeCurrentQuantity,
    changeCurrentPage,
    quantityPages,
  } = props;
  const arrForPages = [];
  const startValuePage = 1;
  const allPages = constructorPages(arrForPages, quantityPages, startValuePage);
  const quantityBtns = ['10', '30', '50'];
  return (
    <footer className={items.pageBtns}>
      <div className={items.quantityPages}>
        <p>Количество обьявлений:</p>
        {quantityBtns.map((btnVal) => {
          const divClassActive = cn({
            [items.active]: btnVal === currentQuantity,
          });
          return <button onClick={changeCurrentQuantity} key={btnVal} className={`${items.btnPage} ${divClassActive}`} type="button" value={btnVal}>{btnVal}</button>;
        })}
      </div>
      <div className={items.currentPage}>
        <p>Текущая страница:</p>
        {allPages.map((btnVal) => {
          const divClassActive = cn({
            [items.active]: btnVal === currentPage,
          });
          return <button onClick={changeCurrentPage} key={btnVal} className={`${items.btnPage} ${divClassActive}`} type="button" value={btnVal}>{btnVal}</button>;
        })}
      </div>
    </footer>
  );
};
