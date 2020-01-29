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

export interface IStatelistAllItems {
  countItems: number;
  allItems: IItem[];
  loadState: string;
  filteringData: {
    titleSearch: string;
    currentPage: string;
    quantityItems: string;
  };
}

export interface IActionPositionSucces {
  items: IItem[];
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
