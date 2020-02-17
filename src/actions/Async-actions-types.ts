import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { store } from '../index';
import { reducer } from '../reducers';

type RootState = ReturnType <typeof reducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<null>>;

interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropDefaultNormal {
  title: string;
  type: string;
  id: string;
}

export interface IPropDefaultDropdown {
  title: string;
  type: string;
  id: string;
  values: IDataInputSelect[];
}
