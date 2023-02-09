import { ReactElement, useState } from "react";
import { message } from "antd";
import CountDown from "components/CountDown";
import request from "service/fetch";
import styles from "./index.module.scss";
import { useStore } from "store";
import { observer } from "mobx-react-lite";

interface IProps {
  isShow: boolean;
  onClose: () => void;
}

const Login = ({ isShow = false, onClose }: IProps) => {
  const store = useStore();
  const [isShowVerifyCode, setShowVerifyCode] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    verify: ""
  });

  const handleClose = () => {
    onClose();
  };
  const handleGetVerifyCode = () => {
    if (!form?.phone) {
      message?.warning("请先填写手机号");
      return;
    }

    request
      .post("/api/user/sendVerifyCode", {
        to: form?.phone,
        templateId: 1
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setShowVerifyCode(true);
        } else {
          message?.error(res?.msg || "位置错误");
        }
      });
  };
  const handleLogin = () => {
    request
      .post("/api/user/login", {
        ...form,
        indentity_type: "phone"
      })
      .then((res: any) => {
        if (res?.code === 0) {
          // login success
          store.user.setUserInfo(res?.data);
          onClose?.();
        } else {
          // login error
          message?.error(res?.msg || "未知错误");
        }
      });
  };
  const handleOAuthGithub = () => {};
  const handleCountDownEnd = () => {
    setShowVerifyCode(false);
  };

  return (isShow && (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className={styles.verifyCodeArea}>
          <input
            type="text"
            name="verify"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={(e) => setForm({ ...form, verify: e.target.value })}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? <CountDown time={10} onEnd={handleCountDownEnd} /> : "获取验证码"}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用 Github 登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a href="#" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  )) as ReactElement;
};

export default observer(Login);
