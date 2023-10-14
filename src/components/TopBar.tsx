import styles from "../../styles/top-bar.module.scss";
import { TopBarComponentProps } from "../interfaces/components";
import { BiMessageDetail } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaBowlFood } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function TopBar(props: TopBarComponentProps) {
  const router = useRouter();
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
            {props.cartNumber > 0 && (
              <div className={`${styles["number-notification"]}`}>
                {props.cartNumber}
              </div>
            )}
            Your cart
          </span>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/main/kitchen-order")}
          >
            Order history
          </span>
        </div>
        {props.option && (
          <div className={`${styles["top-bar_options"]}`}>
            <button className="p-1 mx-3 bg-transparent border-0 position-relative">
              {props.notificationNumber > 0 && (
                <div className={`${styles["number-notification"]}`}>
                  {props.notificationNumber}
                </div>
              )}
              <BiMessageDetail fontSize={24} />
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
