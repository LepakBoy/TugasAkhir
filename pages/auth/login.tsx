import InputComponent from "../../src/components/global/InputComponent";

export default function login() {
  return (
    <div>
      <span className="text-danger">login page</span>
      <InputComponent type="text" name="email" />
    </div>
  );
}
