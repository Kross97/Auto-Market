import React from 'react';
import cn from 'classnames';
import addProp from '../../styles/AddProperty.css';
import { IPropsPropertyMain } from './InterfaceAddProperty';

export const PropertyMain: React.FC<IPropsPropertyMain> = (props: IPropsPropertyMain) => {
  const {
    changePropTitle,
    changePropType,
    type,
    title,
  } = props;

  const radioDropClass = cn({
    [addProp.newRadio]: true,
    [addProp.active]: true,
    [addProp.selected]: type === 'Dropdown',
  });
  const radioNumbpClass = cn({
    [addProp.newRadio]: true,
    [addProp.active]: true,
    [addProp.selected]: type === 'Number',
  });
  const radioStringClass = cn({
    [addProp.newRadio]: true,
    [addProp.active]: true,
    [addProp.selected]: type === 'String',
  });

  return (
    <>
      <main className={addProp.content}>
        <h3>Добавление свойства</h3>
        <form className={addProp.form}>
          <label>
        Название свойства
            <span>*</span>
            <input onChange={changePropTitle} type="text" value={title} />
          </label>
          <div>
        Укажите тип свойства
            <span>*</span>
          </div>
          <label className={addProp.radio}>
            <span className={addProp.newRadio} />
            <span className={radioDropClass} />
            <input onChange={changePropType} name="type-prop" type="radio" checked={type === 'Dropdown'} value="Dropdown" />
            <p>Dropdown</p>
          </label>
          <label className={addProp.radio}>
            <span className={addProp.newRadio} />
            <span className={radioNumbpClass} />
            <input onChange={changePropType} name="type-prop" type="radio" checked={type === 'Number'} value="Number" />
            <p>Number</p>
          </label>
          <label className={addProp.radio}>
            <span className={addProp.newRadio} />
            <span className={radioStringClass} />
            <input onChange={changePropType} name="type-prop" type="radio" checked={type === 'String'} value="String" />
            <p>String</p>
          </label>
        </form>
      </main>
    </>
  );
};
