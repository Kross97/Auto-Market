import React from 'react';
import itemCard from '../../styles/ItemCard.css';

export const InputNormal = (props) => {
  const { data } = props;
  return (
    <div className={itemCard.prop} key={data.id}>
      <span>{data.title}</span>
      <p>{data.value}</p>
    </div>
  );
};
