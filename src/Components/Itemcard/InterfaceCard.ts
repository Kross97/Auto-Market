interface IAlert {
  id: string;
  type: string;
  component: string;
}

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

export interface IPropsItemCard {
  match: {
    params: {
      id: string;
    };
  };
  allAlerts: IAlert[];
  allItems: IItem[];
  addAllItems(): void;
  addNewAlert(alert: { alert: IAlert }): void;
}

export interface IAuto {
  title: string;
  price: string;
}

interface IDataInputSelect {
  id: string;
  value: string;
}
export interface IPropSelect {
  data: {
    id: number;
    title: string;
    type: string;
    values: IDataInputSelect[];
  };
}

export interface IPropNormal {
  data: {
    id: number;
    title: string;
    type: string;
    isValid: boolean;
    value: string;
  };
}

export interface IPropsAdditional {
  card: IItem;
}
