import { IItem, IAlert } from '../../Interface_Application';

export interface IPropsListItems {
  itemsAfterFilterAndSort: IItem[];
  currentQuantity: string;
  removeItem(id: number): ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;
}

export interface IPropsSortNavigation {
  typeSort: string;
  currentSort(type: string): ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

export interface IPropsMainContent {
  allItems: IItem[];
  allAlerts: IAlert[];
  currentQuantity: string;
  typeSort: string;
  deleteItem(id: number): void;
  addNewAlert(alert: { alert: IAlert }): void;
  completeRemovalFromComponent(remove: { component: string }): void;
}

export interface IPropsItemsFooter {
  currentQuantity: string;
  currentPage: string;
  quantityPages: number;
  changeCurrentQuantity(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  changeCurrentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface IStateAllItems {
  currentQuantity: string;
  currentPage: string;
  typeSort: string;
  titleSearch: string;
  titleData: string;
}

export interface IPropsAllItems {
  countItems: number;
  addAllItems(): void;
  addAllProperties(): void;
  addFilterPage(page: { page: string }): void;
  addFilterTitle(title: { title: string }): void;
  addFilterQuantity(quantity: { quantity: string }): void;
}

export interface IAllTypesSorting {
  [type: string]: (tasks: IItem[]) => IItem[];
}
