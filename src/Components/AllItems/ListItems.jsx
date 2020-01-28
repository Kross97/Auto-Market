import React from 'react';
import { Link } from 'react-router-dom';
import items from '../../styles/AllItems.css';

export const ListItems = (props) => {
  const { itemsAfterFilterAndSort, removeItem, currentQuantity } = props;
  return (
    <>
      {itemsAfterFilterAndSort.length !== 0 && (
        <ul>
          {itemsAfterFilterAndSort.map((item, i) => {
            if (i >= currentQuantity) {
              return null;
            }
            return (
              <li className={items.item} key={item.id}>
                <div className={items.itemData}>
                  <Link to={`/card/:${item.id}`}>{item.title}</Link>
                  <span>{item.price}</span>
                  <span>{item.itemDate}</span>
                </div>
                <div className={items.itemControl}>
                  <Link to={`/addItem/:${item.id}`}>ред.</Link>
                  <a href="/" onClick={removeItem(item.id)}>удалить</a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
