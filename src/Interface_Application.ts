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
  allPropertiesData: any[];
}

export interface IPropDefaultNormal {
  title: string;
  type: string;
  id: number;
  value: string;
}

export interface IPropDefaultUnion {
  title: string;
  type: string;
  id: number;
  isValid?: boolean | undefined;
  value?: string | undefined;
  values?: IDataInputSelect[] | undefined;
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

export interface IDataProperties {
  [id: number]: {
    id: number;
    title: string;
    type: string;
    isValid?: boolean;
    value?: string;
    values?: IDataInputSelect[];
  };
}

interface IDataInputSelect {
  id: string;
  value: string;
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
