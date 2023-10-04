import { useRouter } from "next/router";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";
import InputComponent from "../../src/components/global/InputComponent";
import styles from "../../styles/login-page.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  // const regexPassowrd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Insert your email")
      .email("Please insert valid email"),
    // .matches(regexEmail, "Please insert valid email"),
    password: Yup.string().required("Insert your password"),
  });
  const handleLogin = () => {
    router.push("/main/user");
  };
  const formik = useFormik<LoginFormProps>({
    initialValues: { email: "", password: "" },
    onSubmit: handleLogin,
    validationSchema: schema,
    // validateOnChange: true,
  });
  return (
    <div className={styles["wrapper"]}>
      <div className="w-50 bg-danger">
        <></>
      </div>
      <div className={`${styles["login-form_area"]} w-50 `}>
        <div className={styles["login-form_wrapper"]}>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <InputComponent
                placeholder="Input your email"
                type="email"
                name="email"
                label="Email"
                errorMessage={formik.errors.email}
                value={formik.values.email || ""}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                placeholder="Input your password"
                type="password"
                name="password"
                label="Password"
                value={formik.values.password || ""}
                errorMessage={formik.errors.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-2">
              <ButtonComponent
                type="submit"
                style={{ width: "100%" }}
                label="Login"
                // onClick={() => router.push("/main/user")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
