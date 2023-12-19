import styles from "../../styles/top-bar.module.scss";
import { TopBarComponentProps } from "../interfaces/components";
import { BiMessageDetail } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaBowlFood } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputComponent from "./global/InputComponent";
import { object, string, ref } from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

interface UpdatePasswordProps {
  userId: string;
  password: string;
  confirmPassword: string;
}

export default function TopBar(props: TopBarComponentProps) {
  const router = useRouter();
  const [cartList, setCartList] = useState([]);
  const userId =
    typeof window !== "undefined" && localStorage.getItem("userId");

  const handleUpdatePassword = async () => {
    const req = await fetch("http://localhost:8002/api/auth/update-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formik.values),
    });

    await req.json().then((res) => {
      formik.setValues(formik.initialValues);
      if (res.message === "success") {
        Swal.fire({
          title: "Success",
          text: "Your password has been updated",
          icon: "success",
          timer: 5000,
        });
      }
    });
    // alert("ok");
  };

  const schema = object().shape({
    password: string().required("Insert password"),
    confirmPassword: string()
      .required("Please fill confirm password")
      .oneOf([ref("password")], "Password does not match"),
  });

  const formik = useFormik<UpdatePasswordProps>({
    initialValues: {
      userId: userId,
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleUpdatePassword,
    validationSchema: schema,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage)
      setCartList(JSON.parse(localStorage.getItem("cart-order")));
  }, []);

  // not fixed
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage &&
      localStorage.getItem("cart-oder") &&
      cartList.length
    )
      localStorage.setItem("cart-order", JSON.stringify(cartList));
  }, [cartList]);

  const BarList = () => {
    switch (props.role) {
      case "USER":
        return (
          <>
            <div className={`${styles["top-bar_menu"]}`}>
              <span
                onClick={() => router.push("/main/menu")} //should based on user role
                className="cursor-pointer"
              >
                Products
              </span>
              <span
                onClick={() => router.push("/cart")}
                className="cursor-pointer position-relative"
              >
                {cartList?.length > 0 && (
                  <div className={`${styles["number-notification"]}`}>
                    {cartList?.length}
                  </div>
                )}
                Your cart
              </span>
              <span
                className="cursor-pointer"
                onClick={() => router.push("/main/order-history")}
              >
                Order history
              </span>
            </div>
          </>
        );
      case "KITCHEN":
        return (
          <>
            <div className={`${styles["top-bar_menu"]}`}>
              <span
                onClick={() => router.push("/kitchen/open-close")}
                className="cursor-pointer"
              >
                Open/Close
              </span>
              <span
                onClick={() => router.push("/kitchen/order-list")}
                className="cursor-pointer position-relative"
              >
                {props.ordeListNumber > 0 && (
                  <div className={`${styles["number-notification"]}`}>
                    {props.ordeListNumber}
                  </div>
                )}
                Order list
              </span>
              <span
                className="cursor-pointer"
                onClick={() => router.push("/kitchen/update-stock")}
              >
                Update stock
              </span>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div
        className={`${styles["top-bar_container"]} py-3 d-flex justify-content-between`}
      >
        {props.head && (
          <div className={`${styles["top-bar_icon"]} px-3`}>
            <FaBowlFood color={"#4f5665"} fontSize={36} />
            <span className={`${styles["top-bar_icon-name"]} ms-3`}>
              Application name
            </span>
          </div>
        )}

        {BarList()}
        {props.option && (
          <div className={`${styles["top-bar_options"]}`}>
            <button className="p-1 mx-3 bg-transparent border-0 position-relative">
              {props.notificationNumber > 0 && (
                <div className={`${styles["number-notification"]}`}>
                  {props.notificationNumber}
                </div>
              )}
              {props.role === "USER" && <BiMessageDetail fontSize={24} />}
            </button>
            <button
              type="button"
              className=" p-1 mx-3 bg-transparent border-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <VscAccount fontSize={24} />
            </button>{" "}
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
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
                <div className="mb-3">
                  <InputComponent
                    placeholder="Confirm your password"
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formik.values.confirmPassword || ""}
                    errorMessage={formik.errors.confirmPassword}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  localStorage.setItem("userId", "");
                  router.push("/auth/login");
                }}
                data-bs-dismiss="modal"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
