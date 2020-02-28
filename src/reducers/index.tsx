/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import _ from 'lodash';
import update from 'immutability-helper';
import * as ListItems from './Interface_ListAllItems';
import * as PropertiesDefault from './Interface_PropertyDefault';
import * as Alerts from './Interface_Alerts';
import * as ItemEdit from './Interface_itemForEdit';
import { IItem } from '../Interface_Application';

const stateItemForEdit : ItemEdit.IstateItemForEdit = {
  statusLoadingItem: '',
  positionForEdit: {
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
  },
};

export const itemForEdit = createSlice({
  name: 'currentitem',
  initialState: stateItemForEdit,
  reducers: {
    loadingItemRequest: (state) => {
      state.statusLoadingItem = 'Loading Item Request';
    },
    loadingItemSucces: (state, action: PayloadAction<ListItems.IActionItemSucces>) => {
      const { item } = action.payload;
      state.statusLoadingItem = 'Loading Item Succes';
      state.positionForEdit = item;
    },
    loadingItemfailed: (state) => {
      state.statusLoadingItem = 'Loading Item Failed';
    },
  },
});

const stateAllItems: ListItems.IStatelistAllItems = {
  countItems: 0,
  allItems: [],
  statusOperation: '',
  filteringData: {
    titleSearch: '',
    currentPage: '',
    quantityItems: '',
  },
};

export const listAllItems = createSlice({
  name: 'listAllItems',
  initialState: stateAllItems,
  reducers: {
    loadingPositionsRequest: (state) => {
      state.statusOperation = 'Loading Positions Request';
    },
    loadingPositionsSucces: (state, action: PayloadAction<ListItems.IActionPositionSucces>) => {
      const { items } = action.payload;
      return {
        ...state,
        allItems: items,
        countItems: items.length,
        loadState: 'Loading Positions Succes',
      };
    },
    loadingPositionsFailed: (state) => {
      state.statusOperation = 'Loading Positions Failed';
    },
    setNewItemRequest: (state) => {
      state.statusOperation = 'Set New Data Item Request';
    },
    setNewItemSucces: (state, action: PayloadAction<ListItems.IActionSetItemSucces>) => {
      const { id, item } = action.payload;
      const currentIndex = state.allItems.findIndex((it) => it.id === Number(id));
      state.statusOperation = 'Set New Data Item Succes';
      update(state, { allItems: { [currentIndex]: { $set: item } } });
    },
    setNewItemFailed: (state) => {
      state.statusOperation = 'Set New Data Item Failed';
    },
    addItemRequest: (state) => {
      state.statusOperation = 'Add New Item Request';
    },
    addItemSucces: (state, action: PayloadAction<ListItems.IActionItemBeforeServerSucces>) => {
      const { item } = action.payload;
      const { allItems } = state;
      return {
        ...state,
        allItems: [...allItems, item],
        statusOperation: 'Add New Item Succes',
      };
    },
    addItemFailed: (state) => {
      state.statusOperation = 'Add New Item Failed';
    },
    deleteItemRequest: (state) => {
      state.statusOperation = 'Delete Item Request';
    },
    deleteItemSucces: (state, action: PayloadAction<ListItems.IActionDeleteItem>) => {
      const { id } = action.payload;
      const { allItems, countItems } = state;
      return {
        ...state,
        allItems: allItems.filter((it) => (it as IItem).id !== id),
        countItems: countItems - 1,
      };
    },
    deleteItemFailed: (state) => {
      state.statusOperation = 'Delete Item Failed';
    },
    addFilterPage: (state, action: PayloadAction<ListItems.IActionAddFilterPage>) => {
      const { page } = action.payload;
      const { filteringData } = state;
      filteringData.currentPage = page;
    },
    addFilterTitle: (state, action: PayloadAction<ListItems.IActionAddFilterTitle>) => {
      const { title } = action.payload;
      const { filteringData } = state;
      filteringData.titleSearch = title;
    },
    addFilterQuantity: (state, action: PayloadAction<ListItems.IActionAddFilterQuantity>) => {
      const { quantity } = action.payload;
      const { filteringData } = state;
      filteringData.quantityItems = quantity;
    },
  },
});

const stateProperties: PropertiesDefault.IStatePropertyDefault = {
  propertyDefaultNormal: [],
  propertyDefaultDropdown: [],
  statusOperation: '',
};

export const allPropertyDefault = createSlice({
  name: 'allPropertyDefault',
  initialState: stateProperties,
  reducers: {
    loadingPropertiesRequest: (state) => {
      state.statusOperation = 'Loading Properties Request';
    },
    loadingPropertiesSucces: (
      state, action: PayloadAction<PropertiesDefault.IActionPropertiesSucces>,
    ) => {
      const { propertiesNormal, propertiesDropdown } = action.payload;
      return {
        ...state,
        propertyDefaultNormal: propertiesNormal,
        propertyDefaultDropdown: propertiesDropdown,
        statusOperation: 'loading Properties  Succes',
      };
    },
    loadingPropertiesFailed: (state) => {
      state.statusOperation = 'Loading Properties Failed';
    },
    deletePropertyRequest: (state) => {
      state.statusOperation = 'Delete Property Request';
    },
    deletePropertySucces: (
      state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>,
    ) => {
      const { id, type } = action.payload;
      if (type === 'Dropdown') {
        state.propertyDefaultDropdown = state.propertyDefaultDropdown.filter(
          (prop) => prop.id !== id,
        );
      } else {
        state.propertyDefaultNormal = state.propertyDefaultNormal.filter(
          (prop) => prop.id !== id,
        );
      }
    },
    deletePropertyFailed: (state) => {
      state.statusOperation = 'Delete Property Failed';
    },
    addPropRequest: (state) => {
      state.statusOperation = 'Add Propertie Request';
    },
    addPropertyNormal: (state, action: PayloadAction<PropertiesDefault.IActionAddPropNormal>) => {
      const { property } = action.payload;
      state.propertyDefaultNormal.push(property);
    },
    addPropertyDropdown: (
      state, action: PayloadAction<PropertiesDefault.IActionAddPropDropdown>,
    ) => {
      const { property } = action.payload;
      state.propertyDefaultDropdown.push(property);
    },
    addPropFailed: (state) => {
      state.statusOperation = 'Add Propertie Failed';
    },
    loadingPropertiesToChange: (
      state, action: PayloadAction<PropertiesDefault.IActionPropertiesSucces>,
    ) => {
      const { propertiesNormal, propertiesDropdown } = action.payload;
      state.propertyDefaultNormal = propertiesNormal;
      state.propertyDefaultDropdown = propertiesDropdown;
    },
    increaseQuantityInputsDropdown: (
      state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>,
    ) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefaultDropdown.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefaultDropdown.find((prop) => prop.id === id);
      if (!newProp || !newProp.values) {
        return;
      }
      newProp.values.push({ id: _.uniqueId(), value: '' });
      return update(state, { propertyDefaultDropdown: { [currentIndex]: { $set: newProp } } });
    },

    reduceQuantityInputsDropdown: (
      state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>,
    ) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefaultDropdown.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefaultDropdown.find((prop) => prop.id === id);
      if (!newProp || !newProp.values) {
        return;
      }
      newProp.values.pop();
      return update(state, { propertyDefaultDropdown: { [currentIndex]: { $set: newProp } } });
    },
  },
});

const stateAlerts: Alerts.IStateAlerts = {
  allAlerts: [],
};

export const alerts = createSlice({
  name: 'alerts',
  initialState: stateAlerts,
  reducers: {
    addNewAlert: (state, action: PayloadAction<Alerts.IActionAddAlert>) => {
      const { alert } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [alert, ...allAlerts],
      };
    },
    removeAlert: (state, action: PayloadAction<Alerts.IActionRemoveAlert>) => {
      const { id } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: allAlerts.filter((alert) => alert.id !== id),
      };
    },
    completeRemovalFromComponent: (state, action: PayloadAction<Alerts.IActionCompleteRemoval>) => {
      const { component } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: allAlerts.filter((alert) => alert.component !== component),
      };
    },
  },
  extraReducers: {
    [listAllItems.actions.loadingPositionsSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'addItemsSucces', component: 'allItems' });
    },
    [listAllItems.actions.loadingPositionsFailed.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'addItemsFailed', component: 'allItems' });
    },
    [itemForEdit.actions.loadingItemRequest.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'RequestEditItem', component: 'addItem' });
    },
    [itemForEdit.actions.loadingItemSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'SuccesForEditItem', component: 'addItem' });
    },
    [listAllItems.actions.setNewItemSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'succesEditItem', component: 'addItem' });
    },
    [listAllItems.actions.setNewItemFailed.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'FailedEditItem', component: 'addItem' });
    },
    [listAllItems.actions.addItemRequest.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'RequestAddItem', component: 'addItem' });
    },
    [listAllItems.actions.addItemSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'succesAddItem', component: 'addItem' });
    },
    [listAllItems.actions.addItemFailed.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'FailedAddItem', component: 'addItem' });
    },
    [listAllItems.actions.deleteItemSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'deleteItem', component: 'allItems' });
    },
    [allPropertyDefault.actions.loadingPropertiesSucces.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'addPropsSucces', component: 'allProperty' });
    },
    [allPropertyDefault.actions.loadingPropertiesFailed.type]: (state) => {
      state.allAlerts.unshift({ id: _.uniqueId(), type: 'addPropsFailed', component: 'allProperty' });
    },
  },
});

export const reducer = combineReducers({
  listAllItems: listAllItems.reducer,
  allPropertyDefault: allPropertyDefault.reducer,
  alerts: alerts.reducer,
  itemForEdit: itemForEdit.reducer,
});
