import { IAlert } from '../../Interface_Application';

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
  removeProperty(id: number): ((event: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;
}

export interface IPropAllProperty {
  propertyDefault: IPropDefault[];
  allAlerts: IAlert[];
  addNewAlert(alert: { alert: IAlert }): void;
  deleteProperty(id: number): void;
  addAllProperties(): void;
  completeRemovalFromComponent(remove: { component: string }): void;
}
