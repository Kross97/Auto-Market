import { IAlert, IPropDefaultDropdown, IPropDefaultNormal } from '../../Interface_Application';

export interface IPropsPropertyMain {
  type: string;
  title: string;
  changePropTitle(event: React.ChangeEvent<HTMLInputElement>): void;
  changePropType(event: React.ChangeEvent<HTMLInputElement>): void;
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
  addPropertyInEditNormal(id: string, property: IPropDefaultNormal): void;
  addPropertyInEditDropdown(id: string, property: IPropDefaultDropdown): void;
  addNewPropertyNormal(property: IPropDefaultNormal): void;
  addNewPropertyDropdown(property: IPropDefaultDropdown): void;
  addNewAlert(alert: { alert: IAlert }): void;
  completeRemovalFromComponent(remove: { component: string }): void;
}
