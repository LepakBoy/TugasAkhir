import { useRouter } from "next/router";
import TopBar from "../../src/components/TopBar";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";
import cartStyles from "../../styles/cart.module.scss";
import stylesLogin from "../../styles/login-page.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputComponent from "../../src/components/global/InputComponent";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";

interface LoginFormProps {
  email: string;
  password: string;
}

export default function CreateUser() {
  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Insert your email")
      .email("Please insert valid email"),
    password: Yup.string().required("Insert your password"),
  });

  const handleLogin = () => {
    router.push("/main/user");
  };

  const formik = useFormik<LoginFormProps>({
    initialValues: { email: "", password: "" },
    onSubmit: handleLogin,
    validationSchema: schema,
  });

  return (
    <>
      <TopBar option head role="ADMIN" />

      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${cartStyles["cart-list_container"]} text- col-md-6 mx-auto border-end border-start`}
        >
          <div
            className={`${stylesLogin["login-form_area"]} w-50 mt-4 mx-auto`}
          >
            <span className={`${cartStyles["order-summary_title"]}`}>
              {`Create user`}
            </span>
            <div className={`${stylesLogin["login-form_wrapper"]} mt-4`}>
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-3">
                  <InputComponent
                    placeholder="Input email"
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
                    placeholder="Input password"
                    type="password"
                    name="password"
                    label="Password"
                    value={formik.values.password || ""}
                    errorMessage={formik.errors.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <InputComponent
                    placeholder="Confirm password"
                    type="password"
                    name="password"
                    label="Confirm password"
                    value={formik.values.password || ""}
                    errorMessage={formik.errors.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mt-2">
                  <ButtonComponent
                    type="submit"
                    style={{ width: "100%" }}
                    label="Create user"
                    // onClick={() => router.push("/main/user")}
                  />
                  <ButtonPrimaryComponent
                    onClick={() => router.back()}
                    label="Back to home"
                    type="button"
                    backGroundColor="#fff"
                    textColor="#6e6464"
                    style={{
                      width: "168px",
                      marginTop: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
