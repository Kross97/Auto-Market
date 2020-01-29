interface IAlert {
  id: string;
  type: string;
  component: string;
}

export interface IStateAlerts {
  allAlerts: IAlert[];
}

export interface IActionAddAlert {
  alert: IAlert;
}

export interface IActionRemoveAlert {
  id: string;
}

export interface IActionCompleteRemoval {
  component: string;
}
