import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import _ from 'lodash';
import { ItemProp } from './ItemProp';
import { ItemPropSelect } from './ItemPropSelect';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { MainData } from './MainData';
import addItem from '../../styles/AddItem.css';
import { allPropertyDefault, alerts } from '../../reducers';
import * as actions from '../../actions';
import {
  IPropsAddNewItem,
  IStateAddNewItem,
  IAllTypeValidators,
  IPropNormalForItem,
  IPropDropdownForItem,
} from './InterfaceAddItem';
import {
  IAllStateApplication,
  IAlert,
  IItem,
  IPropDefaultNormal,
  IPropDefaultDropdown,
  IDataPropertiesNormal,
  IDataPropertiesSelect,
} from '../../Interface_Application';

const mapStateToProps = (state: IAllStateApplication) => {
  const props = {
    positionForEdit: state.itemForEdit.positionForEdit,
    propertyDefaultNormal: state.allPropertyDefault.propertyDefaultNormal,
    propertyDefaultDropdown: state.allPropertyDefault.propertyDefaultDropdown,
    allItems: state.listAllItems.allItems,
    allAlerts: state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'addItem'),
  };
  return props;
};

const actionCreators = {
  deleteProperty: allPropertyDefault.actions.deletePropertySucces,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
  addAllProperties: actions.addAllProperties,
  getCurrentItem: actions.getCurrentItem,
  setCurrentItemForEdit: actions.setCurrentItemForEdit,
  addNewItem: actions.addNewItem,
  loadingPropertiesToChange: allPropertyDefault.actions.loadingPropertiesToChange,
};

class AddNewItem extends React.Component<IPropsAddNewItem, IStateAddNewItem> {
  constructor(props: IPropsAddNewItem) {
    super(props);
    this.state = {
      dataAllPropsSelect: {},
      dataAllPropsSelectID: [],
      dataPropertiesNormal: {},
      dataPropertiesDropdown: {},
      dataPropertiesNormalID: [],
      dataPropertiesDropdownID: [],
      title: '',
      price: '',
      description: '',
      imgSrc: '',
      imgName: '',
    };
  }

  componentDidMount() {
    const { addAllProperties, getCurrentItem } = this.props;
    const { match: { params: { id } } } = this.props;
    if (id) {
      const idInURL = id.slice(1);
      getCurrentItem(idInURL, this.spliceStateAndItem);
    } else {
      addAllProperties();
    }
  }

  componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'addItem' });
  }

  // Возврат данных элемента для редактирования
  // методы (spliceStateAndItem, addingItemNormalPropsInState, addingItemDropdownPropsInState)
  spliceStateAndItem = () => {
    const { loadingPropertiesToChange, positionForEdit } = this.props;
    this.addingItemNormalPropsInState(positionForEdit);
    this.addingItemDropdownPropsInState(positionForEdit);
    loadingPropertiesToChange({
      propertiesNormal: positionForEdit.allPropertiesDataNormal,
      propertiesDropdown: positionForEdit.allPropertiesDataDropdown,
    });
    const indexSymbol$ = positionForEdit.price.length;
    this.setState({
      title: positionForEdit.title,
      price: positionForEdit.price.slice(0, indexSymbol$ - 1),
      description: positionForEdit.description,
      imgSrc: positionForEdit.imgSrc,
      imgName: positionForEdit.imgName,
    });
  };

  addingItemNormalPropsInState = (item: IItem) => {
    const { dataPropertiesNormalID, dataPropertiesNormal } = this.state;
    const itemPropsNormal = item.allPropertiesDataNormal;
    const itemPropsNormalID = itemPropsNormal.map(
      (prop: IPropNormalForItem) => prop.id,
    );
    const itemDataProperties: IDataPropertiesNormal = {};
    itemPropsNormalID.map((id: string) => {
      const currentProp: IPropNormalForItem | undefined = itemPropsNormal.find(
        (prop) => prop.id === id,
      );
      if (!currentProp) {
        return;
      }
      const dataProp: IPropNormalForItem = {
        title: currentProp.title,
        type: currentProp.type,
        isValid: currentProp.isValid,
        value: currentProp.value,
        id,
      };
      return itemDataProperties[id] = dataProp;
    });
    this.setState({
      dataPropertiesNormalID: [...dataPropertiesNormalID, ...itemPropsNormalID],
      dataPropertiesNormal: { ...dataPropertiesNormal, ...itemDataProperties },
    });
  };

  addingItemDropdownPropsInState = (item: IItem) => {
    const { dataPropertiesDropdownID, dataPropertiesDropdown } = this.state;
    const itemPropsSelect = item.allPropertiesDataDropdown;
    const itemsPropsSelectID = itemPropsSelect.map(
      (prop: IPropDropdownForItem) => prop.id,
    );
    const itemDataProperties: IDataPropertiesSelect = {};
    itemsPropsSelectID.map((id: string) => {
      const currentProp = itemPropsSelect.find(
        (prop: IPropDropdownForItem) => prop.id === id,
      );
      if (!currentProp) {
        return;
      }
      const dataProp: IPropDropdownForItem = {
        title: currentProp.title,
        type: currentProp.type,
        values: [{ id: _.uniqueId(), value: '' }],
        id,
      };
      return itemDataProperties[id] = dataProp;
    });
    this.setState({
      dataPropertiesDropdownID: [...dataPropertiesDropdownID, ...itemsPropsSelectID],
      dataPropertiesDropdown: { ...dataPropertiesDropdown, ...itemDataProperties },
    });
  };

  changeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: target.value });
  };

  changePrice = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ price: target.value });
  };

  changeDescription = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: target.value });
  };

  getImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ imgSrc: String(reader.result), imgName: String(file.name) });
    };
  };

  validationCheck = () => {
    let check = 'add';
    const {
      title,
      price,
      imgSrc,
      dataPropertiesNormalID,
      dataPropertiesNormal,
    } = this.state;
    const { addNewAlert } = this.props;
    const allNotValidProps = dataPropertiesNormalID.map(
      (id) => dataPropertiesNormal[id],
    ).filter((prop) => prop.isValid === false);
    if (title.length > 30 || price.length > 15) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'mainPropsLength', component: 'addItem' } });
      check = 'notAdd';
    }
    if (title === '' || price === '' || imgSrc === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'mainPropsEmpty', component: 'addItem' } });
      check = 'notAdd';
    }
    if (!validator.isInt(price)) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'priceNotString', component: 'addItem' } });
      check = 'notAdd';
    }
    if (allNotValidProps.length !== 0) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'additionPropsNotValid', component: 'addItem' } });
      check = 'notAdd';
    }
    return check;
  };

  addNewOrEditItem = () => {
    const validAllForm = this.validationCheck();
    if (validAllForm === 'notAdd') {
      return;
    }
    const {
      title,
      price,
      description,
      imgSrc,
      imgName,
      dataPropertiesNormal,
      dataPropertiesDropdown,
      dataPropertiesNormalID,
      dataPropertiesDropdownID,
    } = this.state;

    const date = new Date();
    let month;
    if (date.getMonth() <= 9) {
      month = `0${date.getMonth() + 1}`;
    } else {
      month = date.getMonth();
    }
    const itemDate = `${date.getDate()}.${month}.${date.getFullYear()}`;
    const allPropertiesDataNormal: IPropNormalForItem[] = dataPropertiesNormalID.map(
      (id) => dataPropertiesNormal[id],
    );
    const allPropertiesDataDropdown: IPropDropdownForItem[] = dataPropertiesDropdownID.map(
      (id) => dataPropertiesDropdown[id],
    );
    const item = {
      title,
      price: `${price}$`,
      itemDate,
      dateSort: date,
      description,
      imgSrc,
      imgName,
      allPropertiesDataDropdown,
      allPropertiesDataNormal,
    };

    const { match: { params: { id } }, setCurrentItemForEdit, addNewItem } = this.props;
    if (id) {
      setCurrentItemForEdit(id, item);
    } else {
      addNewItem(item);
    }

    this.setState({
      dataAllPropsSelect: {},
      dataAllPropsSelectID: [],
      dataPropertiesNormal: {},
      dataPropertiesDropdown: {},
      dataPropertiesNormalID: [],
      dataPropertiesDropdownID: [],
      title: '',
      price: '',
      description: '',
      imgSrc: '',
      imgName: '',
    });
  };

  createValuesSelect = (id: string, index: number, value: string) => {
    const { dataAllPropsSelect, dataAllPropsSelectID } = this.state;
    const valueOneInput = { id: _.uniqueId(), value };
    let currentStorageSelect;

    if (Object.prototype.hasOwnProperty.call(dataAllPropsSelect, id)) {
      currentStorageSelect = dataAllPropsSelect[id];
    } else {
      currentStorageSelect = {};
    }
    if (!dataAllPropsSelectID.includes(index)) {
      this.setState({ dataAllPropsSelectID: [...dataAllPropsSelectID, index] });
    }
    this.setState({
      dataAllPropsSelect:
    { ...dataAllPropsSelect, [id]: { ...currentStorageSelect, [index]: valueOneInput } },
    });
  };

  addDataInputSelect = (
    { id, title, type }: IPropDefaultDropdown, index: number,
  ) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const {
      dataAllPropsSelect,
      dataAllPropsSelectID,
      dataPropertiesDropdown,
      dataPropertiesDropdownID,
    } = this.state;
    this.createValuesSelect(id, index, target.value);
    const valuesNotFilter = dataAllPropsSelectID.map((i) => dataAllPropsSelect[id][i]);
    const values = valuesNotFilter.filter((val) => val);
    const dataProp = {
      title,
      type,
      values,
      id,
    };
    if (!dataPropertiesDropdownID.includes(id)) {
      this.setState({ dataPropertiesDropdownID: [...dataPropertiesDropdownID, id] });
    }
    this.setState({ dataPropertiesDropdown: { ...dataPropertiesDropdown, [id]: dataProp } });
  };

  validator = (type: string, value: string) => {
    const allTypeValidators: IAllTypeValidators = {
      Number: (val: string) => validator.isInt(val),
      String: (val: string) => !validator.isInt(val),
    };

    return allTypeValidators[type](value);
  };

  addDataInput = (
    { id, title, type }: IPropDefaultNormal,
  ) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { dataPropertiesNormal, dataPropertiesNormalID } = this.state;
    const isValid = this.validator(type, target.value);
    const dataProp = {
      title,
      type,
      isValid,
      id,
      value: target.value,
    };

    if (!dataPropertiesNormalID.includes(id)) {
      this.setState({ dataPropertiesNormalID: [...dataPropertiesNormalID, id] });
    }
    this.setState({ dataPropertiesNormal: { ...dataPropertiesNormal, [id]: dataProp } });
  };

  removeProp = (type: string, id: string) => () => {
    const { deleteProperty } = this.props;
    const { dataPropertiesNormalID, dataPropertiesDropdownID } = this.state;
    if (type === 'Dropdown') {
      const dataPropFiltered = dataPropertiesDropdownID.filter((i) => i !== id);
      this.setState({ dataPropertiesDropdownID: dataPropFiltered });
    } else {
      const dataPropFiltered = dataPropertiesNormalID.filter((i) => i !== id);
      this.setState({ dataPropertiesNormalID: dataPropFiltered });
    }
    deleteProperty({ id, type });
  };

  public render() {
    const {
      dataPropertiesNormalID,
      dataPropertiesDropdownID,
      dataPropertiesNormal,
      title,
      price,
      imgSrc,
      description,
      imgName,
    } = this.state;

    const { propertyDefaultNormal, propertyDefaultDropdown, allAlerts } = this.props;

    let returnPath;
    const { match: { params: { id } } } = this.props;
    if (id) {
      returnPath = `/addProperty/${id}`;
    } else {
      returnPath = '/addProperty/:addItem';
    }
    return (
      <div className={addItem.conteiner}>
        <nav>
          <div className={addItem.buttonsGrp}>
            <Link to="/"><button type="button" className={`${addItem.btn} ${addItem.comeBack}`}>Вернуться</button></Link>
            <button onClick={this.addNewOrEditItem} type="button" className={`${addItem.btn} ${addItem.save}`}>Сохранить</button>
          </div>
        </nav>
        <main className={addItem.content}>
          <h3>Добавление товара</h3>
          <form className={addItem.form}>
            <MainData
              changeTitle={this.changeTitle}
              changePrice={this.changePrice}
              getImgUrl={this.getImgUrl}
              changeDescription={this.changeDescription}
              imgName={imgName}
              title={title}
              price={price}
              imgSrc={imgSrc}
              description={description}
            />
            <h3>Добавление товару свойства</h3>
            <Link to={`${returnPath}`}><button className={addItem.btnAction} type="button">+</button></Link>
            <div className={addItem.properties}>
              {propertyDefaultDropdown.map((prop, i) => (
                <ItemPropSelect
                  dataPropertiesID={dataPropertiesDropdownID}
                  prop={prop}
                  removeProp={this.removeProp(prop.type, prop.id)}
                  addDataInputSelect={this.addDataInputSelect}
                  index={i}
                />
              ))}
              {propertyDefaultNormal.map((prop, i) => (
                <ItemProp
                  dataPropertiesID={dataPropertiesNormalID}
                  dataProperties={dataPropertiesNormal}
                  prop={prop}
                  index={i}
                  addDataInput={this.addDataInput(prop)}
                  removeProp={this.removeProp(prop.type, prop.id)}
                />
              ))}
            </div>
          </form>
          {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
        </main>
      </div>
    );
  }
}

export const AddItem = connect(mapStateToProps, actionCreators)(AddNewItem);
