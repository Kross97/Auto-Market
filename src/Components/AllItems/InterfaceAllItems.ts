interface IItem {
  title: string;
  price: string;
  itemDate: string;
  dateSort: string;
  description: string;
  imgSrc: string;
  imgName: string;
  id: number;
  allPropertiesData: any[];
}

interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IPropsListItems {
  itemsAfterFilterAndSort: IItem[];
  currentQuantity: string;
  removeItem(id: number): any;
}

export interface IPropsSortNavigation {
  typeSort: string;
  currentSort(type: string): any;
}

export interface IPropsMainContent {
  allItems: IItem[];
  allAlerts: IAlert[];
  deleteItem(id: { id: number }): any;
  addNewAlert(alert: { alert: IAlert }): any;
  completeRemovalFromComponent(remove: { component: string }): any;
}

export interface IPropsItemsFooter {
  currentQuantity: string;
  currentPage: string;
  quantityPages: number;
  changeCurrentQuantity(event: React.MouseEvent<HTMLButtonElement>): void;
  changeCurrentPage(event: React.MouseEvent<HTMLButtonElement>): void;
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
  addAllItems(): any;
  addAllProperties(): any;
  addFilterPage(page: { page: string }): any;
  addFilterTitle(title: { title: string }): any;
  addFilterQuantity(quantity: { quantity: string }): any;
}
