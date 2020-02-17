import React from 'react';
import cn from 'classnames';
import items from '../../styles/AllItems.css';
import { IPropsSortNavigation } from './InterfaceAllItems';

export const ItemsSortNavigation = (props: IPropsSortNavigation) => {
  const { currentSort, typeSort } = props;
  const styleSortNames = cn({
    [items.btnSort]: true,
    [items.sortDesc]: typeSort === 'DescTitle',
  });
  const styleSortPrice = cn({
    [items.btnSort]: true,
    [items.sortDesc]: typeSort === 'DescPrice',
  });
  const styleSortData = cn({
    [items.btnSort]: true,
    [items.sortDesc]: typeSort === 'DescData',
  });
  return (
    <nav className={items.navigation}>
      <span>
        <button onClick={currentSort('Title')} className={styleSortNames} type="button" aria-label="sort" />
      Перечень товаров
      </span>
      <span>
        <button onClick={currentSort('Price')} className={styleSortPrice} type="button" aria-label="sort" />
      Стоимость
      </span>
      <span>
        <button onClick={currentSort('Data')} className={styleSortData} type="button" aria-label="sort" />
      Дата изменения
      </span>
      <span>Управление</span>
    </nav>
  );
};
