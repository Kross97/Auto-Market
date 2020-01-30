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
  allPropertiesData: Array<IPropDefaultSelect | IPropDefaultNormal>;
}

interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropDefaultNormal {
  title: string;
  type: string;
  id: number;
  isValid: boolean;
  value: string;
}

export interface IPropDefaultSelect {
  title: string;
  type: string;
  id: number;
  values: IDataInputSelect[];
}

interface IStatelistAllItems {
  countItems: number;
  allItems: IItem[];
  loadState: string;
  filteringData: {
    titleSearch: string;
    currentPage: string;
    quantityItems: string;
  };
}

export interface IDataPropertiesNormal {
  [id: number]: IPropDefaultNormal;
}

export interface IDataPropertiesSelect {
  [id: number]: IPropDefaultSelect;
}

export interface IPropDefault {
  title: string;
  type: string;
  id: number;
  values?: IDataInputSelect[];
}

interface IStatePropertyDefault {
  propertyDefault: IPropDefault[];
  loadState: string;
}

export interface IAllStateApplication {
 listAllItems: IStatelistAllItems;
 allPropertyDefault: IStatePropertyDefault;
 alerts: {
   allAlerts: IAlert[];
 };
}
