export interface IUserInfo {
  userId?: number | null;
  nickname?: string;
  avatar?: string;
}

export interface IUserStore {
  userInfo: IUserInfo;
  setUserInfo: (value: IUserInfo) => void;
}

export const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo(value) {
      this.userInfo = value;
    }
  };
};
