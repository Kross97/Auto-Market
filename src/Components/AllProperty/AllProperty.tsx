import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import properties from '../../styles/AllProperty.css';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { PropertiesList } from './PropertiesList';
import { alerts } from '../../reducers';
import * as actions from '../../actions';
import { IPropAllProperty } from './InterfaceAllProperty';
import { IAllStateApplication, IAlert } from '../../Interface_Application';

const mapStateToProps = ({
  allPropertyDefault: { propertyDefaultNormal, propertyDefaultDropdown },
  alerts: { allAlerts },
}: IAllStateApplication) => {
  const props = {
    propertyDefault: [...propertyDefaultNormal, ...propertyDefaultDropdown],
    allAlerts: allAlerts.filter((alert: IAlert) => alert.component === 'allProperty'),
  };
  return props;
};

const actionCreators = {
  addNewAlert: alerts.actions.addNewAlert,
  deleteProperty: actions.deleteProperty,
  addAllProperties: actions.addAllProperties,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

class Properties extends React.Component<IPropAllProperty, {}> {
  componentDidMount() {
    const { addAllProperties } = this.props;
    addAllProperties();
  }

  componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'allProperty' });
  }

  removeProperty = (
    type: string, id: string,
  ) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { deleteProperty, addNewAlert } = this.props;
    addNewAlert({ alert: { id: _.uniqueId(), type: 'deleteProp', component: 'allProperty' } });
    deleteProperty(type, id);
  };

  public render() {
    const { propertyDefault, allAlerts } = this.props;
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
          removeProperty={this.removeProperty}
        />
        {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
      </main>
    );
  }
}

export const AllProperty = connect(mapStateToProps, actionCreators)(Properties);
