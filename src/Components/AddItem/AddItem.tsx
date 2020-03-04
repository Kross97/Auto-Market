import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import valid from 'validator';
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
  IAllTypeValidators,
  IPropNormalForItem,
  IPropDropdownForItem,
  IdataPropertiesNormal,
  IdataPropertiesDropdown,
  IdataAllPropsSelect,
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

const actionCreators = {
  deleteProperty: allPropertyDefault.actions.deletePropertySucces,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
  addAllProperties: actions.addAllProperties,
  setCurrentItemForEdit: actions.setCurrentItemForEdit,
  addNewItem: actions.addNewItem,
  loadingPropertiesToChange: allPropertyDefault.actions.loadingPropertiesToChange,
};

export const AddItem = (props: IPropsAddNewItem) => {
  const typeForArrId: number[] = [];
  const typeForSelectsID: number[] = [];
  const typeForDataAllSelect: IdataAllPropsSelect = {};
  const typeForDataNormal: IdataPropertiesNormal = {};
  const typeForDataDropdown: IdataPropertiesDropdown = {};
  const typePositionForEdit: IItem = {
    title: '',
    price: '',
    itemDate: '',
    dateSort: '',
    description: '',
    imgSrc: '',
    imgName: '',
    id: 0,
    allPropertiesDataDropdown: [],
    allPropertiesDataNormal: [],
  };
  const [positionForEdit, setPositionForEdit] = useState(typePositionForEdit);
  const [dataAllPropsSelect, setDataAllPropsSelect] = useState(typeForDataAllSelect);
  const [dataAllPropsSelectID, setDataAllPropsSelectID] = useState(typeForSelectsID);
  const [dataPropertiesNormal, setDataPropertiesNormal] = useState(typeForDataNormal);
  const [dataPropertiesDropdown, setDataPropertiesDropdown] = useState(typeForDataDropdown);
  const [dataPropertiesNormalID, setDataPropertiesNormalID] = useState(typeForArrId);
  const [dataPropertiesDropdownID, setDataPropertiesDropdownID] = useState(typeForArrId);
  const [titleState, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [imgName, setImgName] = useState('');

  const dispatch = useDispatch();
  const {
    deleteProperty,
    addNewAlert,
    completeRemovalFromComponent,
    addAllProperties,
    setCurrentItemForEdit,
    addNewItem,
    loadingPropertiesToChange,
  } = bindActionCreators(actionCreators, dispatch);

  const propertyDefaultNormal = useSelector(
    (state: IAllStateApplication) => state.allPropertyDefault.propertyDefaultNormal, shallowEqual,
  );

  const propertyDefaultDropdown = useSelector(
    (state: IAllStateApplication) => state.allPropertyDefault.propertyDefaultDropdown, shallowEqual,
  );

  const allAlertsFiltered = useSelector(
    (state: IAllStateApplication) => state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'addItem'), shallowEqual,
  );
  // Возврат данных элемента для редактирования
  // методы (spliceStateAndItem, addingItemNormalPropsInState, addingItemDropdownPropsInState)
  const addingItemNormalPropsInState = (item: IItem) => {
    const itemPropsNormal = item.allPropertiesDataNormal;
    const itemPropsNormalID = itemPropsNormal.map(
      (prop: IPropNormalForItem) => prop.id,
    );
    const itemDataProperties: IDataPropertiesNormal = {};
    itemPropsNormalID.map((id: number) => {
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
    setDataPropertiesNormalID([...dataPropertiesNormalID, ...itemPropsNormalID]);
    setDataPropertiesNormal({ ...dataPropertiesNormal, ...itemDataProperties });
  };

  const addingItemDropdownPropsInState = (item: IItem) => {
    const itemPropsSelect = item.allPropertiesDataDropdown;
    const itemsPropsSelectID = itemPropsSelect.map(
      (prop: IPropDropdownForItem) => prop.id,
    );
    const itemDataProperties: IDataPropertiesSelect = {};
    itemsPropsSelectID.map((id: number) => {
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
    setDataPropertiesDropdownID([...dataPropertiesDropdownID, ...itemsPropsSelectID]);
    setDataPropertiesDropdown({ ...dataPropertiesDropdown, ...itemDataProperties });
  };

  const spliceStateAndItem = () => {
    addingItemNormalPropsInState(positionForEdit);
    addingItemDropdownPropsInState(positionForEdit);
    loadingPropertiesToChange({
      propertiesNormal: positionForEdit.allPropertiesDataNormal,
      propertiesDropdown: positionForEdit.allPropertiesDataDropdown,
    });
    const indexSymbol$ = positionForEdit.price.length;
    setTitle(positionForEdit.title);
    setPrice(positionForEdit.price.slice(0, indexSymbol$ - 1));
    setDescription(positionForEdit.description);
    setImgSrc(positionForEdit.imgSrc);
    setImgName(positionForEdit.imgName);
  };

  const { match: { params } } = props;

  const getCurrentItem = async (id: string) => {
    addNewAlert({ alert: { id: _.uniqueId(), type: 'RequestEditItem', component: 'addItem' } });
    try {
      const responce = await axios.get(`http://localhost:3000/goods/?id=${id}`);
      const item = { ...responce.data[0] };
      setPositionForEdit(item);
      spliceStateAndItem();
      addNewAlert({ alert: { id: _.uniqueId(), type: 'SuccesForEditItem', component: 'addItem' } });
    } catch (e) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'FailedForEditItem', component: 'addItem' } });
    }
  };

  useEffect(() => {
    if (params.id) {
      const idInURL = params.id.slice(1);
      getCurrentItem(idInURL);
    } else {
      addAllProperties();
    }
    return () => {
      completeRemovalFromComponent({ component: 'addItem' });
    };
  }, [params.id, positionForEdit.id]);

  const changeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const changePrice = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(target.value);
  };

  const changeDescription = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
  };

  const getImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(String(reader.result));
      setImgName(String(file.name));
    };
  };

  const validationCheck = () => {
    let check = 'add';
    const allNotValidProps = dataPropertiesNormalID.map(
      (id) => dataPropertiesNormal[id],
    ).filter((prop) => prop.isValid === false);
    if (titleState.length > 30 || price.length > 15) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'mainPropsLength', component: 'addItem' } });
      check = 'notAdd';
    }
    if (titleState === '' || price === '' || imgSrc === '') {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'mainPropsEmpty', component: 'addItem' } });
      check = 'notAdd';
    }
    if (!valid.isInt(price)) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'priceNotString', component: 'addItem' } });
      check = 'notAdd';
    }
    if (allNotValidProps.length !== 0) {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'additionPropsNotValid', component: 'addItem' } });
      check = 'notAdd';
    }
    return check;
  };

  const addNewOrEditItem = () => {
    const validAllForm = validationCheck();
    if (validAllForm === 'notAdd') {
      return;
    }
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
      id: Number(_.uniqueId()),
      title: titleState,
      price: `${price}$`,
      itemDate,
      dateSort: String(date),
      description,
      imgSrc,
      imgName,
      allPropertiesDataDropdown,
      allPropertiesDataNormal,
    };

    if (params.id) {
      setCurrentItemForEdit(params.id, item);
    } else {
      addNewItem(item);
    }
    setDataAllPropsSelect({});
    setDataAllPropsSelectID([]);
    setDataPropertiesNormal({});
    setDataPropertiesDropdown({});
    setDataPropertiesNormalID([]);
    setDataPropertiesDropdownID([]);
    setTitle('');
    setPrice('');
    setDescription('');
    setImgSrc('');
    setImgName('');
  };

  const createValuesSelect = (id: number, index: number, value: string) => {
    const valueOneInput = { id: _.uniqueId(), value };
    let currentStorageSelect;

    if (Object.prototype.hasOwnProperty.call(dataAllPropsSelect, id)) {
      currentStorageSelect = dataAllPropsSelect[id];
    } else {
      currentStorageSelect = {};
    }
    if (!dataAllPropsSelectID.includes(index)) {
      setDataAllPropsSelectID([...dataAllPropsSelectID, index]);
    }
    setDataAllPropsSelect(
      { ...dataAllPropsSelect, [id]: { ...currentStorageSelect, [index]: valueOneInput } },
    );
  };

  const addDataInputSelect = (
    { id, title, type }: IPropDefaultDropdown, index: number,
  ) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    createValuesSelect(id, index, target.value);
    const valuesNotFilter = dataAllPropsSelectID.map((i) => dataAllPropsSelect[id][i]);
    const values = valuesNotFilter.filter((val) => val);
    const dataProp = {
      title,
      type,
      values,
      id,
    };
    if (!dataPropertiesDropdownID.includes(id)) {
      setDataPropertiesDropdownID([...dataPropertiesDropdownID, id]);
    }
    setDataPropertiesDropdown({ ...dataPropertiesDropdown, [id]: dataProp });
  };

  const validator = (type: string, value: string) => {
    const allTypeValidators: IAllTypeValidators = {
      Number: (val: string) => valid.isInt(val),
      String: (val: string) => !valid.isInt(val),
    };

    return allTypeValidators[type](value);
  };

  const addDataInput = (
    { id, title, type }: IPropDefaultNormal,
  ) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = validator(type, target.value);
    const dataProp = {
      title,
      type,
      isValid,
      id,
      value: target.value,
    };

    if (!dataPropertiesNormalID.includes(id)) {
      setDataPropertiesNormalID([...dataPropertiesNormalID, id]);
    }
    setDataPropertiesNormal({ ...dataPropertiesNormal, [id]: dataProp });
  };

  const removeProp = (type: string, id: number) => () => {
    if (type === 'Dropdown') {
      const dataPropFiltered = dataPropertiesDropdownID.filter((i) => i !== id);
      setDataPropertiesDropdownID(dataPropFiltered);
    } else {
      const dataPropFiltered = dataPropertiesNormalID.filter((i) => i !== id);
      setDataPropertiesNormalID(dataPropFiltered);
    }
    deleteProperty({ id, type });
  };

  let returnPath;
  if (params.id) {
    returnPath = `/addProperty/${params.id}`;
  } else {
    returnPath = '/addProperty/:addItem';
  }

  return (
    <div className={addItem.conteiner}>
      <nav>
        <div className={addItem.buttonsGrp}>
          <Link to="/"><button type="button" className={`${addItem.btn} ${addItem.comeBack}`}>Вернуться</button></Link>
          <button onClick={addNewOrEditItem} type="button" className={`${addItem.btn} ${addItem.save}`}>Сохранить</button>
        </div>
      </nav>
      <main className={addItem.content}>
        <h3>Добавление товара</h3>
        <form className={addItem.form}>
          <MainData
            changeTitle={changeTitle}
            changePrice={changePrice}
            getImgUrl={getImgUrl}
            changeDescription={changeDescription}
            imgName={imgName}
            title={titleState}
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
                removeProp={removeProp(prop.type, prop.id)}
                addDataInputSelect={addDataInputSelect}
                index={i}
              />
            ))}
            {propertyDefaultNormal.map((prop, i) => (
              <ItemProp
                dataProperties={dataPropertiesNormal}
                prop={prop}
                index={i}
                addDataInput={addDataInput(prop)}
                removeProp={removeProp(prop.type, prop.id)}
              />
            ))}
          </div>
        </form>
        {allAlertsFiltered.length !== 0 && <ListAlerts allAlerts={allAlertsFiltered} />}
      </main>
    </div>
  );
};
