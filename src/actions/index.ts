import axios from 'axios';
import _ from 'lodash';
import {
  listAllItems,
  allPropertyDefault,
  itemForEdit,
} from '../reducers';
import { IPropDefault } from '../Components/AddProperty/InterfaceAddProperty';
import { IItemBeforeServer } from '../Components/AddItem/InterfaceAddItem';
import { AppDispatch, AppThunk } from './Async-actions-types';

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
    dispatch(
      allPropertyDefault.actions.loadingPropertiesSucces({ properties: arrProps.data }),
    );
  } catch (e) {
    dispatch(allPropertyDefault.actions.loadingPropertiesFailed());
  }
};

/* GET ITEM FOR EDIT */
export const getCurrentItem = (
  id: string, startEdit: () => void,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(itemForEdit.actions.loadingItemRequest());
  try {
    const responce = await axios.get(`http://localhost:3000/goods/?id=${id}`);
    const item = { ...responce.data[0] };
    dispatch(itemForEdit.actions.loadingItemSucces({ item }));
    startEdit();
  } catch (e) {
    dispatch(itemForEdit.actions.loadingItemfailed());
  }
};

/* SET ITEM AFTER EDIT */

export const setCurrentItemForEdit = (
  id: string, item: IItemBeforeServer,
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

export const addNewItem = (item: IItemBeforeServer): AppThunk => async (dispatch: AppDispatch) => {
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

export const addPropertyInEdit = (
  id: string, property: IPropDefault,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addProperty({ property }));
    const responce = await axios.get(`http://localhost:3000/goods/?id=${id.slice(1)}`);
    const item = { ...responce.data[0] };
    item.allPropertiesData = [...item.allPropertiesData, { id: Number(_.uniqueId()), ...property }];
    axios.patch(`http://localhost:3000/goods/${id.slice(1)}`, item);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

/* ADD NEW PROPERTY */

export const addNewProperty = (
  property: IPropDefault,
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.addPropRequest());
  try {
    dispatch(allPropertyDefault.actions.addProperty({ property }));
    await axios.post('http://localhost:3000/props', property);
  } catch (e) {
    dispatch(allPropertyDefault.actions.addPropFailed());
  }
};

/* DELETE PROPERTY */

export const deleteProperty = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(allPropertyDefault.actions.deletePropertyRequest());
  try {
    dispatch(allPropertyDefault.actions.deletePropertySucces({ id }));
    await axios.delete(`http://localhost:3000/props/${id}`);
  } catch (e) {
    dispatch(allPropertyDefault.actions.deletePropertyFailed());
  }
};
