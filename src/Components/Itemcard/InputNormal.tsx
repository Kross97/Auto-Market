import React from 'react';
import itemCard from '../../styles/ItemCard.css';
import { IPropNormal } from './InterfaceCard';

export const InputNormal: React.FC<IPropNormal> = (props: IPropNormal) => {
  const { data } = props;
  return (
    <div className={itemCard.prop} key={data.id}>
      <span>{data.title}</span>
      <p>{data.value}</p>
    </div>
  );
};
