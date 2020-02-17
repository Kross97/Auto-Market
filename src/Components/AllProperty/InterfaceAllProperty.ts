import { IAlert } from '../../Interface_Application';

interface IDataInputSelect {
  id: string;
  value: string;
}

interface IPropDefault {
  title: string;
  type: string;
  id: string;
  values?: IDataInputSelect[];
}

export interface IPropsList {
  propertyDefault: IPropDefault[];
  removeProperty(type:string, id: string): (
    (event: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;
}

export interface IPropAllProperty {
  propertyDefault: IPropDefault[];
  allAlerts: IAlert[];
  addNewAlert(alert: { alert: IAlert }): void;
  deleteProperty(type: string, id: string): void;
  addAllProperties(): void;
  completeRemovalFromComponent(remove: { component: string }): void;
}
