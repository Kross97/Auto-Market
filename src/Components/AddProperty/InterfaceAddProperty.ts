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

interface IAlert {
  id: string;
  type: string;
  component: string;
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
  addProperty(prop: { property: IPropToAdd }): any;
  addNewAlert(alert: { alert: IAlert }): any;
  completeRemovalFromComponent(remove: { component: string }): any;
}
