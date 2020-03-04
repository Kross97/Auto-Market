import { IPropDefaultNormal, IPropDefaultDropdown } from '../../Interface_Application';

export interface IDataInputSelect {
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

export interface IPropsAddNewItem {
  match: {
    params: {
      id: string;
    };
  };
}

export interface IdataPropertiesNormal {
  [id: number]: IPropNormalForItem;
}

export interface IdataPropertiesDropdown {
  [id: number]: IPropDropdownForItem;
}

export interface IdataAllPropsSelect {
  [id: number]: {
    [index: number]: IDataInputSelect;
  };
}

export interface IStateAddNewItem {
  dataAllPropsSelect: {
    [id: number]: {
      [index: number]: IDataInputSelect;
    };
  };
  dataAllPropsSelectID: number[];
  dataPropertiesNormal: {
    [id: number]: IPropNormalForItem;
  };
  dataPropertiesDropdown: {
    [id: number]: IPropDropdownForItem;
  };
  dataPropertiesNormalID: string[],
  dataPropertiesDropdownID: string[],
  title: string;
  price: string;
  description: string;
  imgSrc: string;
  imgName: string;
}

export interface IPropsMainData {
  imgName: string;
  title: string;
  price: string;
  imgSrc: string;
  description: string;
  changeTitle(event: React.ChangeEvent<HTMLInputElement>): void;
  changePrice(event: React.ChangeEvent<HTMLInputElement>): void;
  getImgUrl(event: React.ChangeEvent<HTMLInputElement>): void;
  changeDescription(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface IPropsItemProp {
  dataProperties: {
    [id: number]: IPropNormalForItem;
  };
  prop: IPropDefaultNormal;
  index: number;
  addDataInput(event: React.ChangeEvent<HTMLInputElement>): void;
  removeProp(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface IPropsItemSelect {
  dataPropertiesID: number[];
  prop: IPropDefaultDropdown;
  index: number;
  removeProp(event: React.MouseEvent<HTMLButtonElement>): void;
  addDataInputSelect(prop: IPropDefaultDropdown, inder: number): any;
}

export interface IAllTypeValidators {
  [type: string]: (val: string) => boolean;
}
