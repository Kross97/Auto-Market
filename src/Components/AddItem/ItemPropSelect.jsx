import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import addItem from '../../styles/AddItem.css';
import { allPropertyDefault } from '../../reducers';

const mapStateToProps = (state) => state;

const actionCreators = {
  reduceQuantityInputsDropdown: allPropertyDefault.actions.reduceQuantityInputsDropdown,
  increaseQuantityInputsDropdown: allPropertyDefault.actions.increaseQuantityInputsDropdown,
};

class ItemSelect extends React.Component {
increaseInput = (id) => () => {
  const { increaseQuantityInputsDropdown } = this.props;
  increaseQuantityInputsDropdown({ id });
}

reduceInput = (id) => () => {
  const { reduceQuantityInputsDropdown } = this.props;
  reduceQuantityInputsDropdown({ id });
}

render() {
  const {
    addDataInputSelect,
    prop,
    removeProp,
    index,
    dataPropertiesID,
  } = this.props;
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
            <input onChange={addDataInputSelect(prop, i)} value={isHaveSelectData === -1 ? '' : null} type="text" />
            <button onClick={this.reduceInput(prop.id)} className={btnClassMinus} type="button">-</button>
          </div>
        ))}
        <button onClick={this.increaseInput(prop.id)} className={addItem.btnActionPlus} type="button">+</button>
      </div>
    </div>
  );
}
}

export const ItemPropSelect = connect(mapStateToProps, actionCreators)(ItemSelect);
