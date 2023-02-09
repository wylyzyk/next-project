import { ironOptions } from "config";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { Cookie } from "next-cookie";
import { clearCookie } from "utils";

export default withIronSessionApiRoute(logout, ironOptions);

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const cookie = Cookie.fromApiRoute(req, res);

  // clear session
  await session.destroy();
  // clear cookie
  clearCookie(cookie, ["avatar", "nickname", "userId"]);

  res?.status(200).json({ code: 0, msg: "退出成功", data: {} });
}
