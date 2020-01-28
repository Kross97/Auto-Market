/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import _ from 'lodash';
import update from 'immutability-helper';

export const listAllItems = createSlice({
  name: 'allItem',
  initialState: {
    countItems: 0,
    allItems: [],
    loadState: '',
    filteringData: {
      titleSearch: '',
      currentPage: '',
      quantityItems: '',
    },
  },
  reducers: {
    loadingPositionsRequest: (state) => {
      state.loadState = 'Loading Positions Request';
    },
    loadingPositionsSucces: (state, action) => {
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
    deleteItem: (state, action) => {
      const { id } = action.payload;
      const { allItems, countItems } = state;
      return {
        ...state,
        allItems: allItems.filter((it) => it.id !== id),
        countItems: countItems - 1,
      };
    },
    addFilterPage: (state, action) => {
      const { page } = action.payload;
      const { filteringData } = state;
      filteringData.currentPage = page;
    },
    addFilterTitle: (state, action) => {
      const { title } = action.payload;
      const { filteringData } = state;
      filteringData.titleSearch = title;
    },
    addFilterQuantity: (state, action) => {
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
  },
  reducers: {
    loadingPropertiesRequest: (state) => {
      state.loadState = 'Loading Properties Request';
    },
    loadingPropertiesSucces: (state, action) => {
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
    deleteProperty: (state, action) => {
      const { id } = action.payload;
      const { propertyDefault } = state;
      return {
        ...state,
        propertyDefault: propertyDefault.filter((prop) => prop.id !== id),
      };
    },
    addProperty: (state, action) => {
      const { property } = action.payload;
      const { propertyDefault } = state;
      return {
        ...state,
        propertyDefault: [...propertyDefault, property],
      };
    },
    loadingPropertiesToChange: (state, action) => {
      const { properties } = action.payload;
      state.propertyDefault = properties;
    },
    increaseQuantityInputsDropdown: (state, action) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefault.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefault.find((prop) => prop.id === id);
      newProp.values.push({ id: _.uniqueId(), value: '' });
      return update(state, { propertyDefault: { [currentIndex]: { $set: newProp } } });
    },
    reduceQuantityInputsDropdown: (state, action) => {
      const { id } = action.payload;
      const currentIndex = state.propertyDefault.findIndex((prop) => prop.id === id);
      const newProp = state.propertyDefault.find((prop) => prop.id === id);
      newProp.values.pop();
      return update(state, { propertyDefault: { [currentIndex]: { $set: newProp } } });
    },
  },
});

export const alerts = createSlice({
  name: 'alerts',
  initialState: { allAlerts: [] },
  reducers: {
    addNewAlert: (state, action) => {
      const { alert } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [alert, ...allAlerts],
      };
    },
    removeAlert: (state, action) => {
      const { id } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: allAlerts.filter((alert) => alert.id !== id),
      };
    },
    completeRemovalFromComponent: (state, action) => {
      const { component } = action.payload;
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: allAlerts.filter((alert) => alert.component !== component),
      };
    },
  },
  extraReducers: {
    [listAllItems.actions.loadingPositionsSucces]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addItemsSucces', component: 'allItems' }],
      };
    },
    [listAllItems.actions.loadingPositionsFailed]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addItemsFailed', component: 'allItems' }],
      };
    },
    [allPropertyDefault.actions.loadingPropertiesSucces]: (state) => {
      const { allAlerts } = state;
      return {
        ...state,
        allAlerts: [...allAlerts, { id: _.uniqueId(), type: 'addPropsSucces', component: 'allProperty' }],
      };
    },
    [allPropertyDefault.actions.loadingPropertiesFailed]: (state) => {
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
