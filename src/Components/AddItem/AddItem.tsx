import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import _ from 'lodash';
import { ItemProp } from './ItemProp';
import { ItemPropSelect } from './ItemPropSelect';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { MainData } from './MainData';
import addItem from '../../styles/AddItem.css';
import { allPropertyDefault, alerts } from '../../reducers';
import * as actions from '../../actions';
import { IPropsAddNewItem, IStateAddNewItem, IAllTypeValidators } from './InterfaceAddItem';
import { IAllStateApplication, IAlert, IItem, IPropDefault, IPropDefaultNormal, IPropDefaultSelect, IDataPropertiesNormal, IDataPropertiesSelect } from '../../Interface_Application';

const mapStateToProps = (state: IAllStateApplication) => {
  const props = {
    propertyDefault: state.allPropertyDefault.propertyDefault,
    allItems: state.listAllItems.allItems,
    allAlerts: state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'addItem'),
  };
  return props;
};

const actionCreators = {
  deleteProperty: allPropertyDefault.actions.deleteProperty,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
  addAllProperties: actions.addAllProperties,
  loadingPropertiesToChange: allPropertyDefault.actions.loadingPropertiesToChange,
};

class AddNewItem extends React.Component<IPropsAddNewItem, IStateAddNewItem> {
  constructor(props: IPropsAddNewItem) {
    super(props);
    this.state = {
      dataAllPropsSelect: {},
      dataAllPropsSelectID: [],
      dataProperties: {},
      dataPropertiesID: [],
      title: '',
      price: '',
      description: '',
      imgSrc: '',
      imgName: '',
    };
  }

  public componentDidMount() {
    const { addAllProperties } = this.props;
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.spliceStateAndItem(id);
    } else {
      addAllProperties();
    }
  }

  public componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'addItem' });
  }

// Возврат данных элемента для редактирования
// методы (spliceStateAndItem, addingItemNormalPropsInState, addingItemDropdownPropsInState)
public spliceStateAndItem = async (idInURL: string) => {
  const { loadingPropertiesToChange } = this.props;
  const id = idInURL.slice(1);
  const responce = await axios.get(`http://localhost:3000/goods/?id=${id}`);
  const item = { ...responce.data[0] };
  this.addingItemNormalPropsInState(item);
  this.addingItemDropdownPropsInState(item);
  loadingPropertiesToChange({ properties: item.allPropertiesData });
  const indexSymbol$ = item.price.length;
  this.setState({
    title: item.title,
    price: item.price.slice(0, indexSymbol$ - 1),
    description: item.description,
    imgSrc: item.imgSrc,
    imgName: item.imgName,
  });
}

public addingItemNormalPropsInState = (item: IItem) => {
  const { dataPropertiesID, dataProperties } = this.state;
  const itemPropsNormal = item.allPropertiesData.filter((prop: IPropDefault) => prop.type !== 'Dropdown');
  const itemPropsNormalID = itemPropsNormal.map((prop: IPropDefaultNormal | IPropDefaultSelect) => prop.id);
  const itemDataProperties: IDataPropertiesNormal = {};
  itemPropsNormalID.map((id: number) => {
    const currentProp: IPropDefaultNormal | IPropDefaultSelect | undefined = itemPropsNormal.find((prop) => prop.id === id);
    if (!currentProp) {
      return;
    }
    const dataProp: IPropDefaultNormal = {
      title: currentProp.title,
      type: currentProp.type,
      isValid: (currentProp as IPropDefaultNormal).isValid,
      value: (currentProp as IPropDefaultNormal).value,
      id,
    };
    return itemDataProperties[id] = dataProp;
  });
  this.setState({
    dataPropertiesID: [...dataPropertiesID, ...itemPropsNormalID],
    dataProperties: { ...dataProperties, ...itemDataProperties },
  });
}

public addingItemDropdownPropsInState = (item: IItem) => {
  const { dataPropertiesID, dataProperties } = this.state;
  const itemPropsSelect = item.allPropertiesData.filter((prop: IPropDefault) => prop.type === 'Dropdown');
  const itemsPropsSelectID = itemPropsSelect.map((prop: IPropDefaultNormal | IPropDefaultSelect) => prop.id);
  const itemDataProperties: IDataPropertiesSelect = {};
  itemsPropsSelectID.map((id: number) => {
    const currentProp = itemPropsSelect.find((prop: IPropDefaultNormal | IPropDefaultSelect) => prop.id === id);
    if (!currentProp) {
      return;
    }
    const dataProp: IPropDefaultSelect = {
      title: currentProp.title,
      type: currentProp.type,
      values: [{ id: _.uniqueId(), value: '' }],
      id,
    };
    return itemDataProperties[id] = dataProp;
  });
  this.setState({
    dataPropertiesID: [...dataPropertiesID, ...itemsPropsSelectID],
    dataProperties: { ...dataProperties, ...itemDataProperties },
  });
}

  public changeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  this.setState({ title: target.value });
}

 public changePrice = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  this.setState({ price: target.value });
}

  public changeDescription = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
  this.setState({ description: target.value });
}

  public getImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files === null) {
    return;
  }
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.setState({ imgSrc: String(reader.result), imgName: String(file.name) });
  };
}

  public validationCheck = () => {
  let check = 'add';
  const {
    title,
    price,
    imgSrc,
    dataProperties,
    dataPropertiesID,
  } = this.state;
  const { addNewAlert } = this.props;
  const allNotValidProps = dataPropertiesID.filter((id) => (dataProperties[id] as IPropDefaultNormal).isValid === false);
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
}

  public addNewOrEditItem = () => {
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
    dataProperties,
    dataPropertiesID,
  } = this.state;

  const { addNewAlert } = this.props;
  const date = new Date();
  let month;
  if (date.getMonth() <= 9) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth();
  }
  const itemDate = `${date.getDate()}.${month}.${date.getFullYear()}`;
  const allPropertiesData = dataPropertiesID.map((iden) => dataProperties[iden]);
  const item = {
    title,
    price: `${price}$`,
    itemDate,
    dateSort: date,
    description,
    imgSrc,
    imgName,
    allPropertiesData,
  };

  const { match: { params: { id } } } = this.props;
  if (id) {
    axios.patch(`http://localhost:3000/goods/${id.slice(1)}`, item);
    addNewAlert({ alert: { id: _.uniqueId(), type: 'succesEditItem', component: 'addItem' } });
  } else {
    axios.post('http://localhost:3000/goods', item);
    addNewAlert({ alert: { id: _.uniqueId(), type: 'succesAddItem', component: 'addItem' } });
  }

  this.setState({
    dataAllPropsSelect: {},
    dataAllPropsSelectID: [],
    dataProperties: {},
    dataPropertiesID: [],
    title: '',
    price: '',
    description: '',
    imgSrc: '',
    imgName: '',
  });
}

  public createValuesSelect = (id: number, index: number, value: string) => {
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
}

  public addDataInputSelect = ({ id, title, type }: IPropDefault, index: number) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  const {
    dataAllPropsSelect,
    dataAllPropsSelectID,
    dataProperties,
    dataPropertiesID,
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
  if (!dataPropertiesID.includes(id)) {
    this.setState({ dataPropertiesID: [...dataPropertiesID, id] });
  }
  this.setState({ dataProperties: { ...dataProperties, [id]: dataProp } });
}

  public validator = (type: string, value: string) => {
  const allTypeValidators: IAllTypeValidators = {
    Number: (val: string) => validator.isInt(val),
    String: (val: string) => !validator.isInt(val),
  };

  return allTypeValidators[type](value);
}

  public addDataInput = ({ id, title, type }: IPropDefault) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  const { dataProperties, dataPropertiesID } = this.state;
  const isValid = this.validator(type, target.value);
  const dataProp = {
    title,
    type,
    isValid,
    id,
    value: target.value,
  };
  if (!dataPropertiesID.includes(id)) {
    this.setState({ dataPropertiesID: [...dataPropertiesID, id] });
  }
  this.setState({ dataProperties: { ...dataProperties, [id]: dataProp } });
}

   public removeProp = (id: number) => () => {
  const { deleteProperty } = this.props;
  const { dataPropertiesID } = this.state;
  const dataPropertiesIDFiltered = dataPropertiesID.filter((i) => i !== id);
  this.setState({ dataPropertiesID: dataPropertiesIDFiltered });
  deleteProperty({ id });
}

  public render() {
  const { dataPropertiesID, dataProperties, imgName } = this.state;
  const { propertyDefault, allAlerts } = this.props;

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
            state={this.state}
          />
          <h3>Добавление товару свойства</h3>
          <Link to={`${returnPath}`}><button className={addItem.btnAction} type="button">+</button></Link>
          <div className={addItem.properties}>
            {propertyDefault.map((prop, i) => (
              prop.type === 'Dropdown'
                ? (
                  <ItemPropSelect
                    dataPropertiesID={dataPropertiesID}
                    prop={prop}
                    removeProp={this.removeProp(prop.id)}
                    addDataInputSelect={this.addDataInputSelect}
                    index={i}
                  />
                )
                : (
                  <ItemProp
                    dataPropertiesID={dataPropertiesID}
                    dataProperties={dataProperties}
                    prop={prop}
                    index={i}
                    addDataInput={this.addDataInput(prop)}
                    removeProp={this.removeProp(prop.id)}
                  />
                )
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
