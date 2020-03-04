import { IItem } from '../../Interface_Application';

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
  currentQuantity: string;
  typeSort: string;
}

export interface IPropsItemsFooter {
  currentQuantity: string;
  currentPage: string;
  quantityPages: number;
  changeCurrentQuantity(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  changeCurrentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface IAllTypesSorting {
  [type: string]: (tasks: IItem[]) => IItem[];
}
