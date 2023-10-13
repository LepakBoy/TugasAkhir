import { RiDeleteBin5Line } from "react-icons/ri";
import styles from "../../styles/cart.module.scss";

export default function CartItem() {
  return (
    <>
      <div className="cart-container d-flex mb-3">
        <div className={`${styles["cart-item_outter"]} cart-item_outter w-100`}>
          <div className="d-flex w-100">
            <div className="p-2 d-flex align-items-center">
              <img
                className={`${styles["cart_image"]}`}
                src="../../images/burger.jpg"
                alt=""
              />
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className="p-2">
                <p className={`${styles["cart-item_name"]} mb-0`}>
                  {"Menu selected item name selected item name name"}
                </p>
                <p className={`${styles["cart-item_price"]} mb-0 d-inline`}>
                  {"Rp 20000"}
                </p>
                <p className={`${styles["cart-item_qty"]} mb-0 d-inline ms-2`}>
                  {"X2"}
                </p>
              </div>
              <div
                className={`${styles["cart-item_total_wrapper"]} p-2 d-flex align-items-center justify-content-end`}
              >
                <p className={`${styles["cart-item_total"]} m-0`}>
                  {"Rp 52000"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center p-2">
          <button className="bg-transparent border-0">
            <RiDeleteBin5Line fontSize={32} color="#6a4029" />
          </button>
        </div>
      </div>
    </>
  );
}
