import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "config";
import { prepareConnection } from "db";
import { User, UserAuth } from "db/entity";
import { ISession } from "..";
import { Cookie } from "next-cookie";
import { setCookie } from "utils";

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const UserAuthRepo = db.getRepository(UserAuth);

  const cookie = Cookie.fromApiRoute(req, res);

  if (String(session?.verifyCode) === String(verify)) {
    // 验证码正确
    const userInfo = await UserAuthRepo.findOne({
      where: { identity_type, identifier: phone } as any,
      relations: ["user"]
    });
    if (userInfo) {
      // 已存在
      const user = userInfo.user;
      const { id, nickname, avatar } = user;

      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();

      setCookie(cookie, { userId: String(id), avatar, nickname });

      res.status(200).json({
        code: 0,
        msg: "login success",
        data: {
          userId: id,
          nickname,
          avatar
        }
      });
    } else {
      // 新用户
      const user = new User();
      user.nickname = `user_${Math.floor(Math.random() * 10000)}`;
      user.avatar = "https://avatars.githubusercontent.com/u/49738226?s=40&v=4";
      user.job = "暂无";
      user.introduce = "暂无";

      const userAuth = new UserAuth();
      userAuth.identifier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session?.verifyCode;
      userAuth.user = user;

      const resUserAuth = await UserAuthRepo.save(userAuth);
      const {
        user: { id, nickname, avatar }
      } = resUserAuth;

      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();

      setCookie(cookie, { userId: String(id), avatar, nickname });

      res?.status(200).json({
        code: 0,
        msg: "login success",
        data: {
          userId: id,
          nickname,
          avatar
        }
      });
    }
  } else {
    // 验证码错误
    res?.status(200).json({ code: -1, msg: "verify code error", data: null });
  }
}
