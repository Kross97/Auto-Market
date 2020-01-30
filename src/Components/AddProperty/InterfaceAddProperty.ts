import { IAlert } from '../../Interface_Application';

export interface IPropsPropertyMain {
  type: string;
  title: string;
  changePropTitle(event: React.ChangeEvent<HTMLInputElement>): void;
  changePropType(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface IDataInputSelect {
  id: string;
  value: string;
}

interface IPropToAdd {
  title: string;
  type: string;
  values?: IDataInputSelect[] | undefined;
}

export interface IStateAddNewProperty {
  title: string;
  type: string;
}

export interface IPropsAddNewProperty {
  propertyDefaultTitles: string[];
  allAlerts: IAlert[];
  match: {
    params: {
      from: string;
    };
  };
  addProperty(prop: { property: IPropToAdd }): void;
  addNewAlert(alert: { alert: IAlert }): void;
  completeRemovalFromComponent(remove: { component: string }): void;
}
