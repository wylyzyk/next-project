import Link from "next/link";
import { useRouter } from "next/router";
import { navs } from "./config";
import styles from "./index.module.scss";

const Navbar = () => {
  const { pathname } = useRouter();
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
    </div>
  );
};

export default Navbar;
