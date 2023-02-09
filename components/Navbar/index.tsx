import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { navs } from "./config";
import styles from "./index.module.scss";
import Login from "components/Login";
import { useStore } from "store";
import request from "service/fetch";
import { observer } from "mobx-react-lite";

const Navbar = () => {
  const handleGotoPersonalPage = () => {};
  const handleLogout = () => {
    console.log("exit");
    request.post("/api/user/logout").then((res: any) => {
      console.log(res);
      if (res?.code === 0) {
        store.user.setUserInfo({});
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a href="#" onClick={handleGotoPersonalPage}>
          <HomeOutlined /> 个人主页
        </a>
      )
    },
    {
      key: "2",
      label: (
        <a href="#" onClick={handleLogout}>
          <LoginOutlined /> 退出
        </a>
      )
    }
  ];
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;
  const { pathname } = useRouter();

  const handleGotoEditorPage = () => {};

  const handleLogin = () => {
    setShowLogin(true);
  };

  const [isShowLogin, setShowLogin] = useState(false);
  const handleClose = () => {
    setShowLogin(false);
  };

  const renderDropDownMenu = (menu: any) => {
    return menu;
    // return <div>{React.cloneElement(menu as React.ReactElement)}</div>;
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value}>
            <span className={pathname === nav?.value ? styles.active : ""}>{nav?.label}</span>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        {userId ? (
          <Dropdown
            placement="bottomLeft"
            menu={{ items }}
            // eslint-disable-next-line react/no-unstable-nested-components
            dropdownRender={(menu) => renderDropDownMenu(menu)}
          >
            <Avatar src={avatar} size={32} />
          </Dropdown>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>

      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(Navbar);
