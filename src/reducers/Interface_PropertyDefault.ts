interface IDataInputSelect {
  id: string;
  value: string;
}

export interface IPropDefaultNormal {
  title: string;
  type: string;
  id: string;
}

export interface IPropDefaultDropdown {
  title: string;
  type: string;
  id: string;
  values: IDataInputSelect[];
}

export interface IStatePropertyDefault {
  propertyDefaultNormal: IPropDefaultNormal[];
  propertyDefaultDropdown: IPropDefaultDropdown[];
  statusOperation: string;
}

export interface IActionPropertiesSucces {
  propertiesNormal: IPropDefaultNormal[];
  propertiesDropdown: IPropDefaultDropdown[];
}

export interface IActionDeletePropOrQuantityInputs {
  type: string;
  id: string;
}

export interface IActionAddPropNormal {
  property: IPropDefaultNormal;
}

export interface IActionAddPropDropdown {
  property: IPropDefaultDropdown;
}
