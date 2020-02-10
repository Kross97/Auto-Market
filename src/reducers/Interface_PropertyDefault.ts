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

export interface IPropToAdd {
  title: string;
  type: string;
  values?: IDataInputSelect[] | undefined;
}


export interface IStatePropertyDefault {
  propertyDefault: IPropDefault[];
  statusOperation: string;
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
