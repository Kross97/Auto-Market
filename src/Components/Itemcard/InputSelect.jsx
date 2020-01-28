import React from 'react';
import itemCard from '../../styles/ItemCard.css';

export const InputSelect = (props) => {
  const { data } = props;
  return (
    <div className={itemCard.propSelect} key={data.id}>
      <span>{data.title}</span>
      <select>
        {data.values.map((el) => (<option key={el.id}>{el.value}</option>))}
      </select>
    </div>
  );
};
