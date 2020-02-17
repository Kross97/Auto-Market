import React from 'react';
import itemCard from '../../styles/ItemCard.css';
import { InputSelect } from './InputSelect';
import { InputNormal } from './InputNormal';
import { IPropsAdditional } from './InterfaceCard';

export const CardAdditionalProps = (props: IPropsAdditional) => {
  const { card } = props;
  return (
    <div className={itemCard.additionalProps}>
      {card.allPropertiesDataDropdown.length === 0 && card.allPropertiesDataNormal.length === 0 && (
      <p>
     Дополнительное описание товара отсутсвует
      </p>
      )}
      {card.allPropertiesDataDropdown.length !== 0 && (
      <div className={itemCard.conteinerAdditional}>
        {card.allPropertiesDataDropdown.map((data) => <InputSelect data={data} />)}
      </div>
      )}
      {card.allPropertiesDataNormal.length !== 0 && (
      <div className={itemCard.conteinerAdditional}>
        {card.allPropertiesDataNormal.map((data) => <InputNormal data={data} />)}
      </div>
      )}
    </div>
  );
};
