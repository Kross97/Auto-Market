import { IItem } from '../Interface_Application';

export interface IStatelistAllItems {
  countItems: number;
  allItems: IItem[];
  statusOperation: string;
  filteringData: {
    titleSearch: string;
    currentPage: string;
    quantityItems: string;
  };
}

export interface IActionPositionSucces {
  items: IItem[];
}

export interface IActionItemSucces {
  item: IItem;
}

export interface IActionSetItemSucces {
  id: string;
  item: IItem;
}

export interface IActionDeleteItem {
  id: number;
}

export interface IActionAddFilterPage {
  page: string;
}

export interface IActionAddFilterTitle {
  title: string;
}

export interface IActionAddFilterQuantity {
  quantity: string;
}
