import type { NextPage } from "next";
import Navbar from "components/Navbar";
import Footer from "../Footer";
import { ReactElement } from "react";

interface IProps {
  children: ReactElement;
}

const Layout: NextPage<IProps> = ({ children }: IProps) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
