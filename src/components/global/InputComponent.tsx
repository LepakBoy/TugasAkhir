import { InputComponentsProps } from "../../interfaces/components";
import styles from "../../../styles/input.module.scss";

export default function InputComponent(props: InputComponentsProps) {
  return (
    <>
      {props.label && (
        <label
          className={styles["label-input_component"]}
          htmlFor={props.labelFor}
        >
          {props.label}
        </label>
      )}
      <input
        placeholder={props.placeholder}
        className={styles["input-component"]}
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <div className={`${styles["error-input_component"]} text-danger`}>
          {props.errorMessage}
        </div>
      )}
    </>
  );
}
