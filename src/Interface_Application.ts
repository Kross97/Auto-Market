import { reducer } from './reducers';

export interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IItem {
  title: string;
  price: string;
  itemDate: string;
  dateSort: string;
  description: string;
  imgSrc: string;
  imgName: string;
  id: number;
  allPropertiesDataDropdown: IPropDropdownForItem[];
  allPropertiesDataNormal: IPropNormalForItem[];
}

interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropNormalForItem {
  title: string;
  type: string;
  id: number;
  isValid: boolean;
  value: string;
}

export interface IPropDropdownForItem {
  title: string;
  type: string;
  id: number;
  values: IDataInputSelect[];
}

export interface IPropDefaultNormal {
  title: string;
  type: string;
  id: number;
}

export interface IPropDefaultDropdown {
  title: string;
  type: string;
  id: number;
  values: IDataInputSelect[];
}

export interface IDataPropertiesNormal {
  [id: number]: IPropNormalForItem;
}

export interface IDataPropertiesSelect {
  [id: number]: IPropDropdownForItem;
}

export type IAllStateApplication = ReturnType<typeof reducer>;
