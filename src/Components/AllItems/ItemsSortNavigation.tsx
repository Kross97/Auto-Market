import React from 'react';
import items from '../../styles/AllItems.css';
import { IPropsSortNavigation } from './InterfaceAllItems';

export const ItemsSortNavigation: React.FC<IPropsSortNavigation> = (props: IPropsSortNavigation) => {
  const { currentSort, typeSort } = props;
  return (
    <nav className={items.navigation}>
      <span>
        <button onClick={currentSort('Title')} className={`${items.btnSort} ${typeSort === 'DescTitle' ? [items.sortDesc] : null}`} type="button" aria-label="sort" />
      Перечень товаров
      </span>
      <span>
        <button onClick={currentSort('Price')} className={`${items.btnSort} ${typeSort === 'DescPrice' ? [items.sortDesc] : null}`} type="button" aria-label="sort" />
      Стоимость
      </span>
      <span>
        <button onClick={currentSort('Data')} className={`${items.btnSort} ${typeSort === 'DescData' ? [items.sortDesc] : null}`} type="button" aria-label="sort" />
      Дата изменения
      </span>
      <span>Управление</span>
    </nav>
  );
};
