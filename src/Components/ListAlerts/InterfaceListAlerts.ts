export interface IPropsAlert {
  text: string;
  alertClass: string;
  onClick(event: React.MouseEvent<HTMLDivElement>): void;
}

interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IPropsListAlerts {
  allAlerts: IAlert[];
}
