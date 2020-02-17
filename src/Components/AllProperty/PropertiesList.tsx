import React from 'react';
import properties from '../../styles/AllProperty.css';
import { IPropsList } from './InterfaceAllProperty';

export const PropertiesList = (props: IPropsList) => {
  const { propertyDefault, removeProperty } = props;
  return (
    <div className={properties.listConteiner}>
      {propertyDefault.length !== 0 && (
      <ul className={properties.list}>
        {propertyDefault.map((prop) => (
          <li key={prop.id}>
            <div className={properties.properties}>
              <p>{prop.title}</p>
              <p>{prop.type}</p>
            </div>
            <a onClick={removeProperty(prop.type, prop.id)} href="/">Удалить</a>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};
