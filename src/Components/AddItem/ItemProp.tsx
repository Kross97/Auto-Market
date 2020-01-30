import React from 'react';
import cn from 'classnames';
import addItem from '../../styles/AddItem.css';
import { IPropsItemProp } from './InterfaceAddItem';
import { IPropDefaultNormal } from '../../Interface_Application';

export const ItemProp: React.FC<IPropsItemProp> = (props: IPropsItemProp) => {
  const {
    dataPropertiesID,
    dataProperties,
    prop,
    index,
    addDataInput,
    removeProp,
  } = props;
  const propIsHaveData = dataPropertiesID.filter((id) => id === prop.id).length;
  let dataPropInitial: IPropDefaultNormal = {
    title: prop.title,
    type: prop.type,
    id: prop.id,
    isValid: true,
    value: '',
  };
  let erorStyle;
  if (propIsHaveData !== 0) {
    dataPropInitial = (dataProperties[prop.id] as IPropDefaultNormal);
    erorStyle = cn({
      [addItem.erorValid]: dataPropInitial.isValid === false,
    });
  }
  return (
    <div key={prop.id} className={addItem.propData}>
      <button onClick={removeProp} className={addItem.btnAction} type="button">-</button>
      <div className={addItem.propHeader}>
        <span>{`Свойство${index + 1}`}</span>
        <div className={`${addItem.propTitle}  ${erorStyle}`}>{prop.title}</div>
      </div>
      <div className={addItem.propInput}>
        <span>Значение</span>
        <input className={`${erorStyle}`} onChange={addDataInput} value={dataPropInitial.value} type="text" />
      </div>
    </div>
  );
};
