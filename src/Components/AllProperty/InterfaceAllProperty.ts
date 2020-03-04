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
  removeProperty(type:string, id: number): (
    (event: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;
}
