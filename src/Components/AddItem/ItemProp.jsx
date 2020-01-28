import React from 'react';
import cn from 'classnames';
import addItem from '../../styles/AddItem.css';

export const ItemProp = (props) => {
  const {
    dataPropertiesID,
    dataProperties,
    prop,
    index,
    addDataInput,
    removeProp,
  } = props;
  const propIsHaveData = dataPropertiesID.filter((id) => id === prop.id).length;
  let dataProp = { value: '' };
  let erorStyle;
  if (propIsHaveData !== 0) {
    dataProp = dataProperties[prop.id];
    erorStyle = cn({
      [addItem.erorValid]: dataProp.isValid === false,
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
        <input className={`${erorStyle}`} onChange={addDataInput} value={dataProp.value} type="text" />
      </div>
    </div>
  );
};
