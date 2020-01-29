export interface IProps {
  text: string;
  alertClass: string;
  onClick(): void;
}

interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IProps {
 allAlerts: IAlert[];
 removeAlert(obJId: Iid): void;
}

interface IId {
  id: string;
}
