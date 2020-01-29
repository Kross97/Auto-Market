export interface IStateRegistr {
  typePassword: string;
  typeReplayPassword: string;
  login: string;
  password: string;
  replayPassword: string;
  processRegistr: string;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IStateLogin {
  typePassword: string;
  user: IUser;
  login: string;
  password: string;
}
