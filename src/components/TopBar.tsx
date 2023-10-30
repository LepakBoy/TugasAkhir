import styles from "../../styles/top-bar.module.scss";
import { TopBarComponentProps } from "../interfaces/components";
import { BiMessageDetail } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaBowlFood } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TopBar(props: TopBarComponentProps) {
  const router = useRouter();
  // const local = window.localStorage;
  // const aa = local.getItem("cart-order");
  // console.log(aa, "local ss");
  // const initStorage = JSON.parse(localStorage.getItem("cart-order")) || [];
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage)
      setCartList(JSON.parse(localStorage.getItem("cart-order")));
  }, []);

  // not fixed
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && cartList.length)
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
                onClick={() => router.push("/kitchen/order-list")}
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
                onClick={() => router.push("/kitchen/order-list")}
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
            <button className="p-1 mx-3 bg-transparent border-0">
              <VscAccount fontSize={24} />
            </button>{" "}
          </div>
        )}
      </div>
    </>
  );
}
