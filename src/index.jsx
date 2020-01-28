import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';
import { AllContent } from './Components/AllContent/AllContent';
import { Login } from './Components/Autorization/Login';
import { Registration } from './Components/Autorization/Registration';
import { AddItem } from './Components/AddItem/AddItem';
import { AddProperty } from './Components/AddProperty/AddProperty';
import { ItemCard } from './Components/Itemcard/ItemCard';

const store = configureStore({
  reducer,
  preloadedState: {
    listAllItems: {
      countItems: 0,
      allItems: [],
      loadState: '',
      filteringData: {
        titleSearch: '',
        currentPage: '1',
        quantityItems: '10',
      },
    },
  },
});


ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Route exact path="/" component={AllContent} />
      <Route path="/login" component={Login} />
      <Route exact path="/addItem" component={AddItem} />
      <Route path="/addItem/:id" component={AddItem} />
      <Route exact path="/addProperty" component={AddProperty} />
      <Route path="/addProperty/:from" component={AddProperty} />
      <Route path="/card/:id" component={ItemCard} />
      <Route path="/registration" component={Registration} />
    </Provider>
  </HashRouter>,
  document.getElementById('content'),
);
