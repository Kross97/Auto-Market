import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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

const actionCreators = {
  addPropertyInEditNormal: actions.addPropertyInEditNormal,
  addPropertyInEditDropdown: actions.addPropertyInEditDropdown,
  addNewPropertyNormal: actions.addNewPropertyNormal,
  addNewPropertyDropdown: actions.addNewPropertyDropdown,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

export const AddProperty = (props: IPropsAddNewProperty) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();
  const {
    addPropertyInEditNormal,
    addPropertyInEditDropdown,
    addNewPropertyNormal,
    addNewPropertyDropdown,
    addNewAlert,
    completeRemovalFromComponent,
  } = bindActionCreators(actionCreators, dispatch);

  const propertyDefaultTitles = useSelector(defaultPropsTitles);

  const allAlertsFitered = useSelector(
    ({ alerts: { allAlerts } }: IAllStateApplication) => allAlerts.filter((alert: IAlert) => alert.component === 'addProp'), shallowEqual,
  );

  useEffect(() => () => {
    completeRemovalFromComponent({ component: 'addProp' });
  }, []);

  const constructorPropNormal = () => {
    const property = { id: Number(_.uniqueId()), title, type };
    return property;
  };

  const constructorPropDropdown = () => {
    const property = {
      id: Number(_.uniqueId()),
      title,
      type,
      values: [{ id: _.uniqueId(), value: '' }],
    };
    return property;
  };

  const addNewProperty = () => {
    const allPropTitles = new Set(propertyDefaultTitles);
    if (allPropTitles.has(title) || title === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'erorTitle', component: 'addProp' } });
      return;
    }
    if (type === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'erorType', component: 'addProp' } });
      return;
    }

    const { match: { params: { from } } } = props;

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
      {allAlertsFitered.length !== 0 && <ListAlerts allAlerts={allAlertsFitered} />}
    </div>
  );
};
