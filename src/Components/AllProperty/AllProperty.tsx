import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import properties from '../../styles/AllProperty.css';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { PropertiesList } from './PropertiesList';
import { alerts } from '../../reducers';
import * as actions from '../../actions';
import { IAllStateApplication, IAlert } from '../../Interface_Application';

const actionCreators = {
  addNewAlert: alerts.actions.addNewAlert,
  deleteProperty: actions.deleteProperty,
  addAllProperties: actions.addAllProperties,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

export const AllProperty = () => {
  const dispatch = useDispatch();
  const {
    completeRemovalFromComponent,
    addAllProperties,
    deleteProperty,
    addNewAlert,
  } = bindActionCreators(actionCreators, dispatch);

  const { propertyDefault } = useSelector(({
    allPropertyDefault: { propertyDefaultNormal, propertyDefaultDropdown },
  }: IAllStateApplication) => (
    { propertyDefault: [...propertyDefaultNormal, ...propertyDefaultDropdown] }
  ), shallowEqual);

  const { allAlertsFiltered } = useSelector(({
    alerts: { allAlerts },
  }: IAllStateApplication) => (
    { allAlertsFiltered: allAlerts.filter((alert: IAlert) => alert.component === 'allProperty') }
  ), shallowEqual);

  useEffect(() => {
    addAllProperties();
    return () => {
      completeRemovalFromComponent({ component: 'allProperty' });
    };
  }, []);

  const removeProperty = (
    type: string, id: number,
  ) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    addNewAlert({ alert: { id: _.uniqueId(), type: 'deleteProp', component: 'allProperty' } });
    deleteProperty(type, id);
  };

  return (
    <main className={properties.content}>
      <div className={properties.btns}>
        <Link to="/addProperty"><button type="button" className={properties.btn}>Добавить проперти</button></Link>
      </div>
      <div className={properties.navigation}>
        <div className={properties.navigationData}>
          <span>Перечень проперти</span>
          <span>Тип</span>
        </div>
        <span>Управление</span>
      </div>
      <PropertiesList
        propertyDefault={propertyDefault}
        removeProperty={removeProperty}
      />
      {allAlertsFiltered.length !== 0 && <ListAlerts allAlerts={allAlertsFiltered} />}
    </main>
  );
};
