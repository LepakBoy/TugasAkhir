import { InputComponentsProps } from "../../interfaces/components";
import Styles from "../../../styles/input.module.scss";
export default function InputComponent(props: InputComponentsProps) {
  return (
    <>
      <input
        className={Styles["input-component"]}
        type={props.type}
        value={props.value}
        name={props.name}
      />
    </>
  );
}
