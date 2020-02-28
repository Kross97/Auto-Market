import React from 'react';
import cn from 'classnames';
import addItem from '../../styles/AddItem.css';
import { IPropsItemProp } from './InterfaceAddItem';

export const ItemProp = (props: IPropsItemProp) => {
  const {
    dataPropertiesID,
    dataProperties,
    prop,
    index,
    addDataInput,
    removeProp,
  } = props;
  const propIsHaveData = dataPropertiesID.filter((id) => id === prop.id).length;
  let valueProp = '';
  if (propIsHaveData !== 0) {
    valueProp = dataProperties[prop.id].value;
  }

  const erorStyle = cn({
    [addItem.erorValid]: propIsHaveData !== 0 && dataProperties[prop.id].isValid === false,
  });

  return (
    <div key={prop.id} className={addItem.propData}>
      <button onClick={removeProp} className={addItem.btnAction} type="button">-</button>
      <div className={addItem.propHeader}>
        <span>{`Свойство${index + 1}`}</span>
        <div className={`${addItem.propTitle}  ${erorStyle}`}>{prop.title}</div>
      </div>
      <div className={addItem.propInput}>
        <span>Значение</span>
        <input className={`${erorStyle}`} onChange={addDataInput} value={valueProp} type="text" />
      </div>
    </div>
  );
};
