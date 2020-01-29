interface IDataInputSelect {
  id: string;
  value: string;
}

interface IPropDefault {
  title: string;
  type: string;
  id: number;
  values?: IDataInputSelect[];
}

export interface IPropsList {
  propertyDefault: IPropDefault[];
  removeProperty(id: number): any;
}

interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IPropAllProperty {
  propertyDefault: IPropDefault[];
  allAlerts: IAlert[];
  addNewAlert(alert: { alert: IAlert }): any;
  deleteProperty(id: { id: number }): any;
  addAllProperties(): any;
  completeRemovalFromComponent(remove: { component: string }): any;
}
