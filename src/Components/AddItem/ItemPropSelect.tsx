import React from 'react';
import cn from 'classnames';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import addItem from '../../styles/AddItem.css';
import { allPropertyDefault } from '../../reducers';
import { IPropsItemSelect } from './InterfaceAddItem';

const actionCreators = {
  reduceQuantityInputsDropdown: allPropertyDefault.actions.reduceQuantityInputsDropdown,
  increaseQuantityInputsDropdown: allPropertyDefault.actions.increaseQuantityInputsDropdown,
};

export const ItemPropSelect = (props: IPropsItemSelect) => {
  const dispatch = useDispatch();
  const {
    reduceQuantityInputsDropdown,
    increaseQuantityInputsDropdown,
  } = bindActionCreators(actionCreators, dispatch);

  const increaseInput = (id: number) => () => {
    increaseQuantityInputsDropdown({ id });
  };

  const reduceInput = (id: number) => () => {
    reduceQuantityInputsDropdown({ id });
  };

  const {
    addDataInputSelect,
    prop,
    removeProp,
    index,
    dataPropertiesID,
  } = props;
  const isHaveSelectData = dataPropertiesID.findIndex((id) => id === prop.id);

  const btnClassMinus = cn({
    [addItem.btnDelete]: prop.values.length !== 1,
    [addItem.btnDisabled]: prop.values.length === 1,
  });

  return (
    <div key={prop.id} className={addItem.propData}>
      <button onClick={removeProp} className={addItem.btnAction} type="button">-</button>
      <div className={addItem.propHeader}>
        <span>{`Свойство${index + 1}`}</span>
        <div className={addItem.propTitle}>{prop.title}</div>
      </div>
      <div className={`${addItem.propInput} ${addItem.selected}`}>
        <span>Значение</span>
        {prop.values.map((el, i) => (
          <div key={el.id}>
            <input onChange={addDataInputSelect(prop, i)} value={isHaveSelectData === -1 ? '' : undefined} type="text" />
            <button onClick={reduceInput(prop.id)} className={btnClassMinus} type="button">-</button>
          </div>
        ))}
        <button onClick={increaseInput(prop.id)} className={addItem.btnActionPlus} type="button">+</button>
      </div>
    </div>
  );
};
