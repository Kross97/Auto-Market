import axios from 'axios';
import _ from 'lodash';
import {
  listAllItems,
  allPropertyDefault,
} from '../reducers';
import { IItem } from '../Interface_Application';
import {
  AppDispatch,
  AppThunk,
  IPropDefaultNormal,
  IPropDefaultDropdown,
} from './Async-actions-types';

/* ITEMS */
export const addAllItems = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(listAllItems.actions.loadingPositionsRequest());
  try {
    const arrItems = await axios.get('http://localhost:3000/goods');
    dispatch(listAllItems.actions.loadingPositionsSucces({ items: arrItems.data }));
  } catch (e) {
    dispatch(listAllItems.actions.loadingPositionsFailed());
  }
};

/* PROPERTIES */
export const addAllProperties = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.loadingPropertiesRequest());
  try {
    const arrProps = await axios.get('http://localhost:3000/props');
    const propertiesNormal: IPropDefaultNormal[] = arrProps.data.filter((prop: IPropDefaultNormal) => prop.type !== 'Dropdown');
    const propertiesDropdown: IPropDefaultDropdown[] = arrProps.data.filter((prop: IPropDefaultDropdown) => prop.type === 'Dropdown');
    dispatch(
      allPropertyDefault.actions.loadingPropertiesSucces({ propertiesNormal, propertiesDropdown }),
    );
  } catch (e) {
    dispatch(allPropertyDefault.actions.loadingPropertiesFailed());
  }
};

/* SET ITEM AFTER EDIT */

export const setCurrentItemForEdit = (
  id: string, item: IItem,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(listAllItems.actions.setNewItemRequest());
  try {
    dispatch(listAllItems.actions.setNewItemSucces({ id, item }));
    await axios.patch(`http://localhost:3000/goods/${id.slice(1)}`, item);
  } catch (e) {
    dispatch(listAllItems.actions.setNewItemFailed());
  }
};

/* ADD NEW ITEM */

export const addNewItem = (item: IItem): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(listAllItems.actions.addItemRequest());
  try {
    dispatch(listAllItems.actions.addItemSucces({ item }));
    await axios.post('http://localhost:3000/goods', item);
  } catch (e) {
    dispatch(listAllItems.actions.addItemFailed());
  }
};

/* DELETE ITEM */
export const deleteItem = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(listAllItems.actions.deleteItemRequest());
  try {
    dispatch(listAllItems.actions.deleteItemSucces({ id }));
    await axios.delete(`http://localhost:3000/goods/${id}`);
  } catch (e) {
    dispatch(listAllItems.actions.deleteItemFailed());
  }
};

/* ADD  PROPERTY IN EDIT ITEM */

export const addPropertyInEditNormal = (
  id: string, property: IPropDefaultNormal,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addPropertyNormal({ property }));
    const responce = await axios.get(`http://localhost:3000/goods/?id=${id.slice(1)}`);
    const item = { ...responce.data[0] };
    item.allPropertiesDataNormal = [...item.allPropertiesDataNormal, { ...property }];
    axios.patch(`http://localhost:3000/goods/${id.slice(1)}`, item);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

export const addPropertyInEditDropdown = (
  id: string, property: IPropDefaultDropdown,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addPropertyDropdown({ property }));
    const responce = await axios.get(`http://localhost:3000/goods/?id=${id.slice(1)}`);
    const item = { ...responce.data[0] };
    item.allPropertiesDataDropdown = [...item.allPropertiesDataDropdown, { ...property }];
    axios.patch(`http://localhost:3000/goods/${id.slice(1)}`, item);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

/* ADD NEW PROPERTY */

export const addNewPropertyNormal = (
  property: IPropDefaultNormal,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addPropertyNormal({ property }));
    const propertyForServer = _.omit(property, 'id');
    await axios.post('http://localhost:3000/props', propertyForServer);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

export const addNewPropertyDropdown = (
  property: IPropDefaultDropdown,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addPropertyDropdown({ property }));
    const propertyForServer = _.omit(property, 'id');
    await axios.post('http://localhost:3000/props', propertyForServer);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

/* DELETE PROPERTY */

export const deleteProperty = (type: string, id: number): AppThunk => async (
  dispatch: AppDispatch,
) => {
  dispatch(allPropertyDefault.actions.deletePropertyRequest());
  try {
    dispatch(allPropertyDefault.actions.deletePropertySucces({ type, id }));
    await axios.delete(`http://localhost:3000/props/${id}`);
  } catch (e) {
    dispatch(allPropertyDefault.actions.deletePropertyFailed());
  }
};
