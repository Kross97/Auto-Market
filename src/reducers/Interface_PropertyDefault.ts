interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropDefault {
  title: string;
  type: string;
  id: number;
  values?: IDataInputSelect[] | undefined;
}

export interface IStatePropertyDefault {
  propertyDefault: IPropDefault[];
  loadState: string;
}

export interface IActionPropertiesSucces {
  properties: IPropDefault[];
}

export interface IActionDeletePropOrQuantityInputs {
  id: number;
}

export interface IActionAddProp {
  property: IPropDefault;
}
