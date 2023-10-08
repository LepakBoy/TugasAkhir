import { ButtonComponentProps } from "../../interfaces/components";
import styles from "../../../styles/button.module.scss";
export default function ButtonPrimaryComponent(props: ButtonComponentProps) {
  return (
    <>
      <button
        className={styles["button-primary_component"]}
        style={{
          ...props.style,
          backgroundColor: props.backGroundColor || " #ffba33",
          color: props.textColor || "#6a4029",
        }}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </>
  );
}
