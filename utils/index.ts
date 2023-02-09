interface ICookieInfo {
  userId: string;
  avatar: string;
  nickname: string;
}

type TInfo = keyof ICookieInfo;

// 登录时效, 24
const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
const path = "/";

export const setCookie = (cookies: any, userInfo: ICookieInfo) => {
  for (const key in userInfo) {
    if (Object.hasOwn(userInfo, key)) {
      const value = userInfo[key as keyof ICookieInfo];
      cookies.set(key, value, { path, expires });
    }
  }
};

export const clearCookie = (cookies: any, data: TInfo | TInfo[]) => {
  console.log("-------------", data, "-------------");
  if (typeof data === "string") {
    cookies.set(data, "");
  }
  if (typeof data === "object") {
    for (const value of data as TInfo[]) {
      cookies.set(value, "", { path, expires });
    }
  }
};
