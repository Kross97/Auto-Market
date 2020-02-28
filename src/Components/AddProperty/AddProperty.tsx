import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { PropertyMain } from './PropertyMain';
import addProp from '../../styles/AddProperty.css';
import { alerts } from '../../reducers';
import { defaultPropsTitles } from '../../selectors';
import { IPropsAddNewProperty } from './InterfaceAddProperty';
import {
  IAllStateApplication,
  IAlert,
  IPropDefaultNormal,
  IPropDefaultDropdown,
} from '../../Interface_Application';
import * as actions from '../../actions';

const mapStateToProps = (state: IAllStateApplication) => {
  const props = {
    propertyDefaultTitles: defaultPropsTitles(state),
    allAlerts: state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'addProp'),
  };
  return props;
};

const actionCreators = {
  addPropertyInEditNormal: actions.addPropertyInEditNormal,
  addPropertyInEditDropdown: actions.addPropertyInEditDropdown,
  addNewPropertyNormal: actions.addNewPropertyNormal,
  addNewPropertyDropdown: actions.addNewPropertyDropdown,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

const AddNewProperty = (props: IPropsAddNewProperty) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const { completeRemovalFromComponent } = props;

  useEffect(() => () => completeRemovalFromComponent({ component: 'addProp' }), []);

  const constructorPropNormal = () => {
    const property = { id: `@idP${_.uniqueId()}`, title, type };
    return property;
  };

  const constructorPropDropdown = () => {
    const property = {
      id: `@idP${_.uniqueId()}`,
      title,
      type,
      values: [{ id: _.uniqueId(), value: '' }],
    };
    return property;
  };

  const addNewProperty = () => {
    const { propertyDefaultTitles, addNewAlert } = props;
    const allPropTitles = new Set(propertyDefaultTitles);
    if (allPropTitles.has(title) || title === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'erorTitle', component: 'addProp' } });
      return;
    }
    if (type === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'erorType', component: 'addProp' } });
      return;
    }

    const {
      match: { params: { from } },
      addPropertyInEditNormal,
      addPropertyInEditDropdown,
      addNewPropertyNormal,
      addNewPropertyDropdown,
    } = props;

    if (from !== ':addItem' && from != undefined) {
      switch (type) {
        case 'Dropdown':
          const propertyDropdown: IPropDefaultDropdown = constructorPropDropdown();
          addPropertyInEditDropdown(from, propertyDropdown);
          break;
        default:
          const propertyNormal: IPropDefaultNormal = constructorPropNormal();
          addPropertyInEditNormal(from, propertyNormal);
      }
    } else {
      switch (type) {
        case 'Dropdown':
          const propertyDropdown: IPropDefaultDropdown = constructorPropDropdown();
          addNewPropertyDropdown(propertyDropdown);
          break;
        default:
          const propertyNormal: IPropDefaultNormal = constructorPropNormal();
          addNewPropertyNormal(propertyNormal);
      }
    }
    addNewAlert({ alert: { id: _.uniqueId(), type: 'successProp', component: 'addProp' } });
    setTitle('');
    setType('');
  };

  const changePropTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const changePropType = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setType(target.value);
  };

  const { allAlerts } = props;
  const { match: { params: { from } } } = props;
  let returnPath;
  switch (from) {
    case ':addItem':
      returnPath = '/addItem';
      break;
    case `${from}`:
      returnPath = `/addItem/${from}`;
      break;
    default:
      returnPath = '/';
  }
  return (
    <div className={addProp.conteiner}>
      <nav>
        <div className={addProp.btns}>
          <Link to={returnPath}><button type="button" className={`${addProp.btn} ${addProp.comeBack}`}>Вернуться</button></Link>
          <button onClick={addNewProperty} type="button" className={`${addProp.btn} ${addProp.save}`}>Сохранить</button>
        </div>
      </nav>
      <PropertyMain
        changePropTitle={changePropTitle}
        changePropType={changePropType}
        type={type}
        title={title}
      />
      {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
    </div>
  );
};

export const AddProperty = connect(mapStateToProps, actionCreators)(AddNewProperty);
