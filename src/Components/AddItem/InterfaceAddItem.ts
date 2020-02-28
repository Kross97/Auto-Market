import {
  IItem,
  IAlert,
  IPropDefaultNormal,
  IPropDefaultDropdown,
} from '../../Interface_Application';

interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropNormalForItem {
  title: string;
  type: string;
  id: string;
  isValid: boolean;
  value: string;
}

export interface IPropDropdownForItem {
  title: string;
  type: string;
  id: string;
  values: IDataInputSelect[];
}

export interface IPropsAddNewItem {
  propertyDefaultDropdown: IPropDefaultDropdown[];
  propertyDefaultNormal: IPropDefaultNormal[];
  allItems: IItem[];
  allAlerts: IAlert[];
  match: {
    params: {
      id: string;
    };
  };
  positionForEdit: IItem;
  deleteProperty(id: { id: string, type: string }): void;
  getCurrentItem(id: string, startEdit: () => void): void;
  setCurrentItemForEdit(id: string, item: IItem): void;
  addNewItem(item: IItem): void;
  addNewAlert(alert: { alert: IAlert }): void;
  completeRemovalFromComponent(remove: { component: string }): void;
  addAllProperties(): void;
  loadingPropertiesToChange(
    prop: { propertiesNormal: IPropDefaultNormal[], propertiesDropdown: IPropDefaultDropdown[]}
  ): void;
}

export interface IdataPropertiesNormal {
  [id: string]: IPropNormalForItem;
}

export interface IdataPropertiesDropdown {
  [id: string]: IPropDropdownForItem;
}

export interface IdataAllPropsSelect {
  [id: string]: {
    [index: number]: IDataInputSelect;
  };
}

export interface IStateAddNewItem {
  dataAllPropsSelect: {
    [id: string]: {
      [index: number]: IDataInputSelect;
    };
  };
  dataAllPropsSelectID: number[];
  dataPropertiesNormal: {
    [id: string]: IPropNormalForItem;
  };
  dataPropertiesDropdown: {
    [id: string]: IPropDropdownForItem;
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
  dataPropertiesID: string[];
  dataProperties: {
    [id: string]: IPropNormalForItem;
  };
  prop: IPropDefaultNormal;
  index: number;
  addDataInput(event: React.ChangeEvent<HTMLInputElement>): void;
  removeProp(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface IPropsItemSelect {
  dataPropertiesID: string[];
  prop: IPropDefaultDropdown;
  index: number;
  removeProp(event: React.MouseEvent<HTMLButtonElement>): void;
  addDataInputSelect(prop: IPropDefaultDropdown, inder: number): any;
  reduceQuantityInputsDropdown(id: { id: string }): any;
  increaseQuantityInputsDropdown(id: { id: string }): any;
}

export interface IAllTypeValidators {
  [type: string]: (val: string) => boolean;
}
