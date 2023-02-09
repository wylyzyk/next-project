import * as process from "process";

export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME || "",
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production"
  }
};
