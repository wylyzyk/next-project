import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import request from "service/fetch";
import { ironOptions } from "config";
import { ISession } from "../index";

export default withIronSessionApiRoute(setVerifyCode, ironOptions);

async function setVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const { to = "", templateId = "1" } = req.body;
  const session: ISession = req.session;
  const AppId = "2c94811c85c276590185fddddec20495";
  const AccountId = "2c94811c85c276590185fddddde2048e";
  const AuthToken = "bb1604606d32427c91af2063c62f3cf6";
  const NowDate = format(new Date(), "yyyyMMddHHmmss");
  const SigParameter = md5(AccountId + AuthToken + NowDate);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireTime = "5";
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
  console.log(SigParameter, Authorization, to, templateId);

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireTime]
    },
    { headers: { Authorization } }
  );
  console.log("response", response);

  const { statusCode, statusMsg } = response as any;
  if (statusCode === "000000") {
    session.verifyCode = verifyCode;
    await session?.save();
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: { name: "owen" }
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg
    });
  }
}
