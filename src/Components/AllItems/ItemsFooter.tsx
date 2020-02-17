import React from 'react';
import cn from 'classnames';
import items from '../../styles/AllItems.css';
import { IPropsItemsFooter } from './InterfaceAllItems';

export const ItemsFooter = (props: IPropsItemsFooter) => {
  const constructorPages = (pages: string[], quantity: number, valuePage: number): string[] => {
    if (quantity === 0) {
      return pages;
    }
    const newAllPages: string[] = [...pages, `${valuePage}`];
    return constructorPages(newAllPages, quantity - 1, valuePage + 1);
  };

  const {
    currentQuantity,
    currentPage,
    changeCurrentQuantity,
    changeCurrentPage,
    quantityPages,
  } = props;
  const arrForPages: string[] = [];
  const startValuePage = 1;
  const allPages: string[] = constructorPages(arrForPages, quantityPages, startValuePage);
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
        {allPages.map((btnVal: string) => {
          const divClassActive = cn({
            [items.active]: btnVal === currentPage,
          });
          return <button onClick={changeCurrentPage} key={btnVal} className={`${items.btnPage} ${divClassActive}`} type="button" value={btnVal}>{btnVal}</button>;
        })}
      </div>
    </footer>
  );
};
