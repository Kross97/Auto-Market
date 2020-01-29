interface IAlert {
  id: string;
  type: string;
  component: string;
}

interface IDataInputSelect {
  id: string;
  value: string;
}

interface IPropDefault {
  title: string;
  type: string;
  id: number;
  values?: IDataInputSelect[] | undefined;
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

export interface IPropsAddNewItem {
 propertyDefault: IPropDefault[];
 allItems: IItem[];
 allAlerts: IAlert[];
 match: {
   params: {
     id: string;
   };
 };
 deleteProperty(id: { id: number }): any;
 addNewAlert(alert: { alert: IAlert }): any;
 completeRemovalFromComponent(remove: { component: string }): any;
 addAllProperties(): any;
 loadingPropertiesToChange(prop: { properties: any[]}): any;
}

export interface IStateAddNewItem {
  dataAllPropsSelect: {
    [id: number]: {
      [index: number]: IDataInputSelect;
    };
  };
  dataAllPropsSelectID: number[];
  dataProperties: {
    [id: number]: {
      id: number;
      title: string;
      type: string;
      isValid?: boolean | undefined;
      value?: string | undefined;
      values?: IDataInputSelect[] | undefined;
    };
  };
  dataPropertiesID: number[];
  title: string;
  price: string;
  description: string;
  imgSrc: string | ArrayBuffer | null;
  imgName: string;
}

export interface IPropsMainData {
  imgName: string;
  state: IStateAddNewItem;
  changeTitle(event: React.ChangeEvent<HTMLInputElement>): void;
  changePrice(event: React.ChangeEvent<HTMLInputElement>): void;
  getImgUrl(event: React.ChangeEvent<HTMLInputElement>): void;
  changeDescription(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface IPropsItemProp {
  dataPropertiesID: number[];
  dataProperties: {
    [id: number]: {
      id: number;
      title: string;
      type: string;
      isValid?: boolean | undefined;
      value?: string | undefined;
      values?: IDataInputSelect[] | undefined;
    };
  };
  prop: IPropDefault;
  index: number;
  addDataInput(event: React.ChangeEvent<HTMLInputElement>): void;
  removeProp(event: React.MouseEvent<HTMLButtonElement> ): void;
}

interface IPropDefaultSelect {
  title: string;
  type: string;
  id: number;
  values: IDataInputSelect[];
}

export interface IPropsItemSelect {
  dataPropertiesID: number[];
  prop: IPropDefaultSelect;
  index: number;
  removeProp(event: React.MouseEvent<HTMLButtonElement>): void;
  addDataInputSelect(prop: IPropDefaultSelect, inder: number): any;
  reduceQuantityInputsDropdown(id: { id: number }): any;
  increaseQuantityInputsDropdown(id: { id: number }): any;
}

export interface IAllTypeValidators {
  [type: string]: (val: string) => boolean;
}
