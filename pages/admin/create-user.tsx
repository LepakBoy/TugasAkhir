import { useRouter } from "next/router";
import TopBar from "../../src/components/TopBar";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";
import cartStyles from "../../styles/cart.module.scss";
import stylesLogin from "../../styles/login-page.module.scss";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import InputComponent from "../../src/components/global/InputComponent";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import Swal from "sweetalert2";

interface LoginFormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const roleOption = ["USER", "KITCHEN"];

export default function CreateUser() {
  const router = useRouter();

  const schema = object().shape({
    email: string().required("Insert email").email("Please insert valid email"),
    username: string().required("Insert username"),
    role: string().required("Inser role"),
    password: string().required("Insert password"),
    confirmPassword: string()
      .required("Please fill confirm password")
      .oneOf([ref("password")], "Password does not match"),
  });

  const handleCreateUser = async () => {
    const req = await fetch("http://localhost:8002/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    });

    await req.json().then((res) => {
      if (res.message === "User registered successfully!")
        Swal.fire({
          title: "Success",
          text: "User Created!",
          icon: "success",
          timer: 5000,
        }).then((res) => {
          formik.setValues(formik.initialValues);
        });
    });
    // router.push("/main/user");
  };

  const formik = useFormik<LoginFormProps>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
    onSubmit: handleCreateUser,
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
                    placeholder="Input username"
                    type="text"
                    name="username"
                    label="User Name"
                    errorMessage={formik.errors.username}
                    value={formik.values.username || ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="RoleUser">Role</label>
                  <select
                    onChange={formik.handleChange}
                    name="role"
                    id="RolseUser"
                    style={{ height: "38px", width: "100%" }}
                  >
                    {roleOption.map((x) => (
                      <option value={x.toUpperCase()}>{x}</option>
                    ))}
                  </select>
                </div>
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
                    name="confirmPassword"
                    label="Confirm password"
                    value={formik.values.confirmPassword || ""}
                    errorMessage={formik.errors.confirmPassword}
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
