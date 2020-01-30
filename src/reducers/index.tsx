/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import _ from 'lodash';
import update from 'immutability-helper';
import * as ListItems from './Interface_ListAllItems';
import * as PropertiesDefault from './Interface_PropertyDefault';
import * as Alerts from './Interface_Alerts';

export const listAllItems = createSlice({
  name: 'listAllItems',
  initialState: {
    countItems: 0,
    allItems: [],
    loadState: '',
    filteringData: {
      titleSearch: '',
      currentPage: '',
      quantityItems: '',
    },
  } as ListItems.IStatelistAllItems,
  reducers: {
    loadingPositionsRequest: (state) => {
      state.loadState = 'Loading Positions Request';
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
      state.loadState = 'Loading Positions Failed';
    },
    deleteItem: (state, action: PayloadAction<ListItems.IActionDeleteItem>) => {
      const { id } = action.payload;
      const { allItems, countItems } = state;
      return {
        ...state,
        allItems: allItems.filter((it) => it.id !== id),
        countItems: countItems - 1,
      };
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

export const allPropertyDefault = createSlice({
  name: 'allPropertyDefault',
  initialState: {
    propertyDefault: [],
    loadState: '',
  } as PropertiesDefault.IStatePropertyDefault,
  reducers: {
    loadingPropertiesRequest: (state) => {
      state.loadState = 'Loading Properties Request';
    },
    loadingPropertiesSucces: (state, action: PayloadAction<PropertiesDefault.IActionPropertiesSucces>) => {
      const { properties } = action.payload;
      return {
        ...state,
        propertyDefault: properties,
        loadState: 'loading Properties Succes',
      };
    },
    loadingPropertiesFailed: (state) => {
      state.loadState = 'Loading Properties Failed';
    },
    deleteProperty: (state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>) => {
      const { id } = action.payload;
      const { propertyDefault } = state;
      return {
        ...state,
        propertyDefault: propertyDefault.filter((prop) => prop.id !== id),
      };
    },
    addProperty: (state, action: PayloadAction<PropertiesDefault.IActionAddProp>) => {
      const { property } = action.payload;
      const { propertyDefault } = state;
      return {
        ...state,
        propertyDefault: [...propertyDefault, property],
      };
    },
    loadingPropertiesToChange: (state, action: PayloadAction<PropertiesDefault.IActionPropertiesSucces>) => {
      const { properties } = action.payload;
      state.propertyDefault = properties;
    },
    increaseQuantityInputsDropdown: (state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefault.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefault.find((prop) => prop.id === id);
      if (!newProp || !newProp.values) {
        return;
      }
      newProp.values.push({ id: _.uniqueId(), value: '' });
      return update(state, { propertyDefault: { [currentIndex]: { $set: newProp } } });

    },
    reduceQuantityInputsDropdown: (state, action: PayloadAction<PropertiesDefault.IActionDeletePropOrQuantityInputs>) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefault.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefault.find((prop) => prop.id === id);
      if (!newProp || !newProp.values) {
        return;
      }
      newProp.values.pop();
      return update(state, { propertyDefault: { [currentIndex]: { $set: newProp } } });
    },
  },
});

const { loadingPositionsSucces } = listAllItems.actions;

export const alerts = createSlice({
  name: 'alerts',
  initialState: { allAlerts: [] } as Alerts.IStateAlerts,
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
    [listAllItems.actions.loadingPositionsSucces as any]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addItemsSucces', component: 'allItems' }],
      };
    },
    [listAllItems.actions.loadingPositionsFailed as any]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addItemsFailed', component: 'allItems' }],
      };
    },
    [allPropertyDefault.actions.loadingPropertiesSucces as any]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addPropsSucces', component: 'allProperty' }],
      };
    },
    [allPropertyDefault.actions.loadingPropertiesFailed as any]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addPropsFailed', component: 'allProperty' }],
      };
    },
  },
});

export const reducer = combineReducers({
  listAllItems: listAllItems.reducer,
  allPropertyDefault: allPropertyDefault.reducer,
  alerts: alerts.reducer,
});
