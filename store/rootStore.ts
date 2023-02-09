import { IUserStore, userStore } from "./userStore";

export interface IStore {
  user: IUserStore;
}

export const createStore = (initialValue: any) => {
  return () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      user: { ...userStore(), ...initialValue?.user }
    } as IStore;
  };
};
