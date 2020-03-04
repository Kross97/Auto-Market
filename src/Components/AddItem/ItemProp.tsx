import React from 'react';
import cn from 'classnames';
import addItem from '../../styles/AddItem.css';
import { IPropsItemProp } from './InterfaceAddItem';

export const ItemProp = (props: IPropsItemProp) => {
  const {
    dataProperties,
    prop,
    index,
    addDataInput,
    removeProp,
  } = props;
  const propIsHaveData = Object.keys(dataProperties).includes(String(prop.id));
  let valueProp = '';
  if (propIsHaveData) {
    valueProp = dataProperties[prop.id].value;
  }

  const erorStyle = cn({
    [addItem.erorValid]: propIsHaveData && dataProperties[prop.id].isValid === false,
  });

  return (
    <div key={prop.id} className={addItem.propData}>
      <button onClick={removeProp} className={addItem.btnAction} type="button">-</button>
      <div className={addItem.propHeader}>
        <span>{`Свойство${index + 1}`}</span>
        <div className={`${addItem.propTitle} ${erorStyle}`}>{prop.title}</div>
      </div>
      <div className={addItem.propInput}>
        <span>Значение</span>
        <input className={`${erorStyle}`} onChange={addDataInput} value={valueProp} type="text" />
      </div>
    </div>
  );
};
