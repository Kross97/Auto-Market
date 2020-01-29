import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { PropertyMain } from './PropertyMain';
import addProp from '../../styles/AddProperty.css';
import { allPropertyDefault, alerts } from '../../reducers';
import { defaultPropsTitles } from '../../selectors';
import { IPropsAddNewProperty, IStateAddNewProperty } from './InterfaceAddProperty';
import { IAllStateApplication, IAlert } from '../../Interface_Application';

const mapStateToProps = (state: IAllStateApplication) => {
  const props = {
    propertyDefaultTitles: defaultPropsTitles(state),
    allAlerts: state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'addProp'),
  };
  return props;
};

const actionCreators = {
  addProperty: allPropertyDefault.actions.addProperty,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

class AddNewProperty extends React.Component<IPropsAddNewProperty, IStateAddNewProperty> {
  constructor(props: IPropsAddNewProperty) {
    super(props);
    this.state = { title: '', type: '' };
  }

  public componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'addProp' });
  }

public constructorProp = () => {
  const { title, type } = this.state;
  const property = { title, type };
  if (type === 'Dropdown') {
    return { ...property, values: [{ id: _.uniqueId(), value: '' }] };
  }
  return property;
}

public addNewProperty = () => {
  const { propertyDefaultTitles, addProperty, addNewAlert } = this.props;
  const { type, title } = this.state;
  const allPropTitles = new Set(propertyDefaultTitles);
  if (allPropTitles.has(title) || title === '') {
    addNewAlert({ alert: { id: _.uniqueId(), type: 'erorTitle', component: 'addProp' } });
    return;
  }
  if (type === '') {
    addNewAlert({ alert: { id: _.uniqueId(), type: 'erorType', component: 'addProp' } });
    return;
  }

  const property = this.constructorProp();
  const { match: { params: { from } } } = this.props;

  if (from !== ':addItem' && from != undefined) {
    axios.get(`http://localhost:3000/goods/?id=${from.slice(1)}`).then((responce) => {
      const item = { ...responce.data[0] };
      item.allPropertiesData = [...item.allPropertiesData, { id: _.uniqueId(), ...property }];
      axios.patch(`http://localhost:3000/goods/${from.slice(1)}`, item);
    });
  } else {
    axios.post('http://localhost:3000/props', property);
    addProperty({ property });
  }
  addNewAlert({ alert: { id: _.uniqueId(), type: 'successProp', component: 'addProp' } });
  this.setState({ title: '', type: '' });
}

  public changePropTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  this.setState({ title: target.value });
}

  public changePropType = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  this.setState({ type: target.value });
}

public render() {
  const { title, type } = this.state;
  const { allAlerts } = this.props;
  const { match: { params: { from } } } = this.props;
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
          <button onClick={this.addNewProperty} type="button" className={`${addProp.btn} ${addProp.save}`}>Сохранить</button>
        </div>
      </nav>
      <PropertyMain
        changePropTitle={this.changePropTitle}
        changePropType={this.changePropType}
        type={type}
        title={title}
      />
      {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
    </div>
  );
}
}

export const AddProperty = connect(mapStateToProps, actionCreators)(AddNewProperty);