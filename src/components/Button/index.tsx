import styles from "./Button.module.scss";
import Link from "next/link";

export default function Button(props: any) {
  return (
    <div className={styles.buttoncontainer}>
      <Link href={props.page}>
        <button
          type="submit"
          onClick={props.handleClick}
        >
          {props.children}
        </button>
      </Link>
    </div>
  );
}