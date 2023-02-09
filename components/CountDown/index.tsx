import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface IProps {
  time: number;
  onEnd: () => void;
}

const CountDown = ({ time, onEnd }: IProps) => {
  const [count, setCount] = useState(time || 60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count <= 0) {
        console.log("already is 0");
        clearInterval(interval);
        onEnd?.();
        // return count;
      }
      setCount((count) => {
        return count - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd, count]);
  return <div className={styles.countdown}>{count}</div>;
};

export default CountDown;
